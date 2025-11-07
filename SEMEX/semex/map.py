import json
import os
from typing import List, Dict


def generate_map(entities: List[Dict], out_path: str):
    """Generate a simple concept-map HTML with inline JSON for D3 consumption.

    Nodes are entities; edges connect entities when one id appears in another's content.
    """
    nodes = []
    edges = []
    id_map = {}
    for i, e in enumerate(entities):
        nid = f"n{i}"
        id_map[e.get('id') or str(i)] = nid
        nodes.append({'id': nid, 'label': e.get('id'), 'type': e.get('type')})

    # naive edges: link if id text appears in other's content
    for i, a in enumerate(entities):
        a_id = a.get('id')
        a_nid = id_map.get(a_id)
        content = (a.get('content') or '')
        for j, b in enumerate(entities):
            if i == j:
                continue
            b_id = b.get('id')
            if b_id and b_id in content:
                edges.append({'source': a_nid, 'target': id_map.get(b_id)})

    data = {'nodes': nodes, 'links': edges}

    # simple HTML + D3 renderer (inline) - small, dependency-free
    html = HTML_TEMPLATE.replace('/*__DATA_JSON__*/', json.dumps(data))
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)


HTML_TEMPLATE = """
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Semex Map</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .node { stroke: #fff; stroke-width: 1.5px; }
    .link { stroke: #999; stroke-opacity: 0.6; }
  </style>
</head>
<body>
  <h2>Semex Concept Map</h2>
  <div id="chart"></div>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script>
  const graph = /*__DATA_JSON__*/;

  const width = 900, height = 600;
  const svg = d3.create("svg").attr("width", width).attr("height", height);
  document.getElementById('chart').appendChild(svg.node());

  const link = svg.append("g").attr("stroke", "#999").attr("stroke-opacity", 0.6)
    .selectAll("line").data(graph.links).join("line").attr("class","link");

  const node = svg.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5)
    .selectAll("circle").data(graph.nodes).join("circle").attr("r", 8).attr("fill", d => d.type === 'concept' ? '#1f77b4' : '#ff7f0e').call(drag(simulation));

  const label = svg.append('g').selectAll('text').data(graph.nodes).join('text').text(d => d.label).attr('x', 12).attr('y', 4);

  const simulation = d3.forceSimulation(graph.nodes)
    .force('link', d3.forceLink(graph.links).id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2));

  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('cx', d => d.x).attr('cy', d => d.y);
    label.attr('x', d => d.x).attr('y', d => d.y);
  });

  function drag(simulation){
    function dragstarted(event){ if (!event.active) simulation.alphaTarget(0.3).restart(); event.subject.fx = event.subject.x; event.subject.fy = event.subject.y; }
    function dragged(event){ event.subject.fx = event.x; event.subject.fy = event.y; }
    function dragended(event){ if (!event.active) simulation.alphaTarget(0); event.subject.fx = null; event.subject.fy = null; }
    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  }
  </script>
</body>
</html>
"""

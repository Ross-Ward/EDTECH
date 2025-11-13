import { useState } from 'react'
import { Service } from '../../types'
import './ServicesView.css'

export default function ServicesView() {
  const [services] = useState<Service[]>([
    {
      id: 'db-1',
      name: 'PostgreSQL Database',
      type: 'database',
      status: 'active',
      config: { host: 'localhost', port: 5432 },
      metrics: { requests: 1250, errors: 3, latency: 45, uptime: 99.9 }
    },
    {
      id: 'api-1',
      name: 'REST API',
      type: 'api',
      status: 'active',
      config: { baseUrl: '/api/v1' },
      metrics: { requests: 5420, errors: 12, latency: 120, uptime: 99.5 }
    },
    {
      id: 'auth-1',
      name: 'Authentication',
      type: 'auth',
      status: 'active',
      config: { provider: 'JWT' },
      metrics: { requests: 890, errors: 0, latency: 30, uptime: 100 }
    },
    {
      id: 'storage-1',
      name: 'File Storage',
      type: 'storage',
      status: 'inactive',
      config: { provider: 'S3' },
      metrics: { requests: 0, errors: 0, latency: 0, uptime: 0 }
    }
  ])

  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const getServiceIcon = (type: Service['type']) => {
    const icons = {
      database: '🗄️',
      api: '🔌',
      auth: '🔐',
      storage: '📦',
      email: '📧'
    }
    return icons[type] || '⚙️'
  }

  const getStatusColor = (status: Service['status']) => {
    const colors = {
      active: '#10b981',
      inactive: '#6b7280',
      error: '#ef4444'
    }
    return colors[status]
  }

  return (
    <div className="services-view">
      <div className="services-header">
        <h2>Backend Services</h2>
        <button className="add-service-button">+ Add Service</button>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => setSelectedService(service)}
          >
            <div className="service-header">
              <div className="service-icon">{getServiceIcon(service.type)}</div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <span className="service-type">{service.type}</span>
              </div>
              <div
                className="service-status"
                style={{ background: getStatusColor(service.status) }}
              >
                {service.status}
              </div>
            </div>

            {service.metrics && (
              <div className="service-metrics">
                <div className="metric">
                  <span className="metric-label">Requests</span>
                  <span className="metric-value">{service.metrics.requests.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Errors</span>
                  <span className="metric-value error">{service.metrics.errors}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Latency</span>
                  <span className="metric-value">{service.metrics.latency}ms</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Uptime</span>
                  <span className="metric-value success">{service.metrics.uptime}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details-modal" onClick={() => setSelectedService(null)}>
          <div className="service-details" onClick={(e) => e.stopPropagation()}>
            <div className="details-header">
              <h2>{selectedService.name}</h2>
              <button className="close-button" onClick={() => setSelectedService(null)}>×</button>
            </div>

            <div className="details-body">
              <div className="detail-section">
                <h3>Configuration</h3>
                <div className="config-grid">
                  {Object.entries(selectedService.config).map(([key, value]) => (
                    <div key={key} className="config-item">
                      <span className="config-key">{key}:</span>
                      <span className="config-value">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedService.metrics && (
                <div className="detail-section">
                  <h3>Metrics</h3>
                  <div className="metrics-chart">
                    <div className="chart-bar">
                      <div className="bar-label">Requests</div>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{ width: `${(selectedService.metrics.requests / 6000) * 100}%` }}
                        />
                      </div>
                      <div className="bar-value">{selectedService.metrics.requests}</div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">Errors</div>
                      <div className="bar-container">
                        <div
                          className="bar-fill error"
                          style={{ width: `${(selectedService.metrics.errors / 50) * 100}%` }}
                        />
                      </div>
                      <div className="bar-value">{selectedService.metrics.errors}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="detail-actions">
                <button className="action-button">Restart Service</button>
                <button className="action-button secondary">View Logs</button>
                <button className="action-button danger">Delete Service</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Write-Host "Running tests with pytest..."
python -m pytest -q
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "All tests passed.";
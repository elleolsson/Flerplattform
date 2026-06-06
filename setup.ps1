$ErrorActionPreference = 'Stop'

npm install
Copy-Item -Path '.env.example' -Destination '.env' -Force
Write-Host 'Created .env from .env.example'

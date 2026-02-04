param(
  [string]$Message = "Auto update"
)

$ErrorActionPreference = "Stop"

$repo = "C:\Users\talal\OneDrive\Personal Documents-Backup\Talal\RedCybers\ai\Clock"

# Add all changes
& git -C $repo add .

# If nothing to commit, exit
$changes = & git -C $repo status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
  Write-Host "No changes to commit."
  exit 0
}

# Commit and sync
& git -C $repo commit -m $Message
& git -C $repo pull --rebase origin main
& git -C $repo push

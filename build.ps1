tsc -p onetestui
tsc -p onetestperformance
tsc -p onetestapi
tfx extension create --manifest-globs vss-extension.json --rev-version
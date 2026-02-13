#!/bin/bash

echo "🔌 Iniciando túneis SSH..."

ssh -N -L 7000:localhost:7000 root@72.62.140.205 &
SSH1_PID=$!

ssh -N -L 7001:localhost:7001 root@72.62.140.205 &
SSH2_PID=$!

echo "🚀 Iniciando projetos..."

cd /Users/devfrontend/projetos/GitHub/core
bun run dev &

cd /Users/devfrontend/projetos/GitHub/gd-frota-web
bun run dev &

echo "✅ Ambiente iniciado!"
echo "Para parar tudo use: kill $SSH1_PID $SSH2_PID"
wait

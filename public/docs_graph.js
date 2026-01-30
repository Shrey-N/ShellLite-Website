// True 3D Interactive Documentation Graph using 3d-force-graph

async function loadGraph() {
    try {
        const response = await fetch('/static/docs_graph.json');
        const data = await response.json();

        // Transform data for 3d-force-graph
        // It expects { nodes: [], links: [] } where links have 'source' and 'target'
        const gData = {
            nodes: data.nodes.map(n => ({
                id: n.id,
                name: n.label,
                group: n.group,
                level: n.level,
                url: n.url,
                color: getGroupColor(n.group)
            })),
            links: data.edges.map(e => ({
                source: e.from,
                target: e.to
            }))
        };

        const container = document.getElementById('docs-graph');

        // Initialize 3D Graph
        const Graph = ForceGraph3D()(container)
            .graphData(gData)
            .nodeLabel('name')
            .nodeColor('color')
            .nodeRelSize(6)
            .nodeResolution(16)
            .linkWidth(2)
            .linkDirectionalArrowLength(3.5)
            .linkDirectionalArrowRelPos(1)
            .backgroundColor('#0d1117') // Matches dark theme
            .onNodeClick(node => {
                if (node.url) {
                    window.location.href = node.url;
                }
            });

        // Add some auto-rotation
        // Graph.controls().autoRotate = true;
        // Graph.controls().autoRotateSpeed = 0.5;

        // Force layout adjustments for hierarchy-ish look
        Graph.d3Force('charge').strength(-120);

        // Helper to match colors from previous JSON
        function getGroupColor(group) {
            const colors = {
                "basics": "#58a6ff",
                "intermediate": "#8b5cf6",
                "advanced": "#f97316",
                "expert": "#ef4444",
                "reference": "#10b981",
                "tutorials": "#f59e0b"
            };
            return colors[group] || '#ffffff';
        }

        // Adjust container size usage
        // 3d-force-graph might default to full screen, we need to constrain it to container
        Graph.width(container.clientWidth);
        Graph.height(container.clientHeight);

        // Handle resize
        window.addEventListener('resize', () => {
            Graph.width(container.clientWidth);
            Graph.height(container.clientHeight);
        });

    } catch (err) {
        console.error('Failed to load 3D graph:', err);
        document.getElementById('docs-graph').innerHTML =
            '<p style="color: #f85149; text-align: center; padding: 40px;">Failed to load 3D graph</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadGraph);

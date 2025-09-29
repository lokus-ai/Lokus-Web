"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

export function ForceGraph({ width = 200, height = 200 }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    // Sample data
    const nodes: Node[] = [
      { id: "Lokus", group: 1 },
      { id: "Notes", group: 2 },
      { id: "Links", group: 2 },
      { id: "Graph", group: 2 },
      { id: "Canvas", group: 2 },
      { id: "Plugins", group: 2 },
      { id: "Search", group: 2 },
      { id: "Templates", group: 2 },
      { id: "Ideas", group: 3 },
      { id: "Knowledge", group: 3 },
      { id: "Projects", group: 3 },
      { id: "Research", group: 3 },
      { id: "Tasks", group: 3 },
      { id: "Archive", group: 3 },
    ];

    const links: Link[] = [
      { source: "Lokus", target: "Notes", value: 1 },
      { source: "Lokus", target: "Links", value: 1 },
      { source: "Lokus", target: "Graph", value: 1 },
      { source: "Lokus", target: "Canvas", value: 1 },
      { source: "Lokus", target: "Plugins", value: 1 },
      { source: "Lokus", target: "Search", value: 1 },
      { source: "Lokus", target: "Templates", value: 1 },
      { source: "Notes", target: "Ideas", value: 1 },
      { source: "Notes", target: "Tasks", value: 1 },
      { source: "Links", target: "Knowledge", value: 1 },
      { source: "Links", target: "Research", value: 1 },
      { source: "Ideas", target: "Knowledge", value: 1 },
      { source: "Canvas", target: "Projects", value: 1 },
      { source: "Templates", target: "Projects", value: 1 },
      { source: "Search", target: "Archive", value: 1 },
      { source: "Research", target: "Knowledge", value: 1 },
      { source: "Projects", target: "Tasks", value: 1 },
    ];

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id((d) => d.id).distance(25))
      .force("charge", d3.forceManyBody().strength(-80))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(15));

    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#4B5563")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value));

    // Add nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.group === 1 ? 8 : d.group === 2 ? 6 : 4)
      .attr("fill", d => d.group === 1 ? "#9CA3AF" : d.group === 2 ? "#6B7280" : "#4B5563")
      .attr("stroke", "#1F2937")
      .attr("stroke-width", 1.5);

    // Add labels
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.id)
      .attr("font-size", "6px")
      .attr("fill", "#9CA3AF")
      .attr("text-anchor", "middle")
      .attr("dy", -8);

    // Add drag functionality
    const drag = d3.drag<SVGCircleElement, Node>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    node.call(drag);

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      node
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);

      label
        .attr("x", (d) => d.x!)
        .attr("y", (d) => d.y!);
    });

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [width, height]);

  return <svg ref={svgRef} className="w-full h-full" />;
}
import * as d3 from 'd3';
require('./css/index.scss')

// variables

var margin = {top: 40, right: 60, bottom: 40, left: 60},
    width  = 1000 - margin.right - margin.left,
    height = 800  - margin.top   - margin.bottom;
    

                

    
var url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';


var simulation = d3.forceSimulation()
                    .force('charge', d3.forceManyBody().strength(-50))
                    .force('link',d3.forceLink().id((d, i)=>  { return i}))
                    .force("x", d3.forceX(width / 2))
                    .force("y", d3.forceY(height / 2)) ; 
                    
var dragStarted = (d) =>{
      if(!d3.event.active) simulation.alphaTarget(.3).restart()
      d.fx = d.x;
      d.fy = d.y;
    };
    
var dragged = (d) =>{
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };
    
var dragEnded = (d) =>{
      if(!d3.event.active) simulation.alphaTarget(0)
      d.fx = null;
      d.fy = null;
    };

d3.json(url, (error, data) => {
    if (error) throw error;
    
    
    function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
    
   
    
    var svg = d3.select('.wrapper').append('svg')
                                .attr('class','links')
                                .attr('width',width + margin.left + margin.right)
                                .attr('height', height + margin.top + margin.bottom)
    var link = svg.selectAll('line')
                    .data(data.links)
                    .enter()
                    .append('line')
                    .attr('stroke','gray')
                    .attr('stroke-width',1);
                    
    
    
                    
    var flags = d3.select('.wrapper').append('div')
                                .attr('class','flags')
                                .attr('width',width + margin.left + margin.right)
                                .attr('height', height + margin.top + margin.bottom)
                                
        var node = flags.selectAll('img')
                            .data(data.nodes)
                            .enter()
                            .append('img')
                            .attr('class', d => ` flag flag-${d.code}`)
                            .call(d3.drag()
                                    .on('start',dragStarted)
                                    .on('drag', dragged)
                                    .on('end', dragEnded));
                                
                                
    
        
var ticked = () =>{
    
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        
    node
        .style("left", function(d) { return (d.x-7) + 'px'; })
        .style("top", function(d) { return (d.y - 5)  + 'px'; });
}
                                
   simulation
        .nodes(data.nodes)
        .on('tick',ticked)
           
        
    simulation
        .force('link')
        .links(data.links);                             
    
                    
    
})




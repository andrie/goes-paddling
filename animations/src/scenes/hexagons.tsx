import {makeScene2D} from '@motion-canvas/2d';
import {Node, Circle, Polygon, Txt, Layout} from '@motion-canvas/2d/lib/components';
import {delay, waitFor, waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import {all, chain, sequence} from '@motion-canvas/core/lib/flow';

// function aLabel(ref:any, str: string, x:number, y: number){
//   return(
//          <Txt x={x} y={y} ref={ref} text={str} fill="white" />
//   );
// }

// function aPoly(ref:any) {
//   return(
//   <Polygon 
//     ref={ref} x={0} y={0} width={320} height={320} sides={3} 
//     stroke={'#fff'} lineWidth={8}
//     rotation={1 * 360/3}
//     fill={'orange'}
//   />
//   )
// }


function gridPoly(ref:any, x:number, y:number, size:number) {
  return(
    <Polygon 
      ref={ref}
      x={x}
      y={y}
      size={size}
      fill="#eef"
      lineWidth={3}
      stroke={'white'}
      scale={0}
    />
  )
}

function cos(th:number) { return(Math.cos(th / 180 * Math.PI)) }
function sin(th:number) { return(Math.sin(th / 180 * Math.PI)) }


export default makeScene2D(function* (view) {
  const polys: Polygon[] = [];
  const size = 180;
  const nrows = 9;
  const ncols = 14;
  const highlight = 25; // the polygon to highlight
  const highlightColor = '#f00';

  view.add(
  <>
    {Array.from({ length: nrows }, (_, i) => 
      Array.from({ length: ncols }, (_, j) => 
        gridPoly(makeRef(polys, i * ncols + j), 
        (j - (ncols / 2)) * size * cos(30) + (i % 2) * size * cos(30) / 2, 
        -size * i * 1.5 * sin(30) + (nrows + 2) * size * sin(30) / 2, 
        size)
      )
    )}
  </>
  );

  yield* all(
    sequence( 0.01, ...polys.map(poly => poly.scale(1, 2))),
    chain(
      waitFor(1),
      sequence( 0.01, ...polys.map(poly => poly.fill('lightblue', 2))),
      ),
    chain(
      waitFor(2),
      polys[highlight].fill(highlightColor, 1),
      waitFor(1)
    )

  );
    
});

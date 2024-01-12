import {makeScene2D} from '@motion-canvas/2d';
import {Node, Circle, Polygon, Txt, Layout, poly} from '@motion-canvas/2d/lib/components';
import {waitFor, waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import {all, loop, sequence} from '@motion-canvas/core/lib/flow';
import {linear} from  '@motion-canvas/core/lib/tweening';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {Dipolyion} from '@motion-canvas/core/lib/types';

function aLabel(ref:any, str: string, x:number, y: number){
  return(
         <Txt x={x} y={y} ref={ref} text={str} fill="white" />
  );
}

function aPoly(ref:any) {
  return(
  <Polygon 
    ref={ref} x={0} y={0} width={320} height={320} sides={3} 
    stroke={'#fff'} lineWidth={8}
    rotation={1 * 360/3}
    fill={'orange'}
  />
  )
}

function animateStop(poly:any, label:any) {

}

// export default makeScene2D(function* (view) {
//   const circle = createRef<Circle>();
//   const hex = createRef<Polygon>();
//   const label = createRef<Txt>();
//   const label2 = createRef<Txt>();
//   view.add(
//     <>
//       {/* <Circle ref={circle} x={200} size={50} fill={'blue'} /> */}
//       <Node>
//         {aPoly(hex)}
//         {aLabel(label, "Yield", 0, 0)}
//       </Node>
//       {aLabel(label2, "hello", -200, -200)}
//     </>
//   );
  
//   yield* waitFor(0.5);
  
//   yield* all(
//     hex().ripple(2),
//   )
//   yield* all(
//     label2().text("world!", 2),
//     hex().sides(8, 5),
//     hex().fill("red", 5),
//     hex().rotation(0.5 * 360 / 8, 5),
//     label().text("Stop", 5)
//   );
  
//   yield* all(
//     hex().ripple(2),
//   )

  
//   yield* waitFor(0.5);

// });

function gridPoly(ref:any, x:number, y:number, size:number) {
  return(
    <Polygon 
      ref={ref}
      x={x}
      y={y}
      size={size}
      fill="lightblue"
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
  const size = 240;
  const n = 8;
  const nrows = 2;

  view.add(
    <>
      {range(12).map(i => (
        gridPoly(makeRef(polys, i), 
        (i/nrows - n/2) * size * cos(30), 
        size * (i % nrows) * 1.5 * sin(30), 
        size)
      ))}
    </>
  );

  yield* sequence(
      0.05,
      ...polys.map(poly => poly.scale(1, 2)
      ),
    );
    
    yield* sequence(
        0.05,
        ...polys.map(poly => poly.ripple(0.5)
        ),
      );
  
  yield polys[8].zIndex(1);

  yield* all(
    polys[8].ripple(1),
    polys[8].fill('#f00', 1),
    waitFor(1)
  );

});

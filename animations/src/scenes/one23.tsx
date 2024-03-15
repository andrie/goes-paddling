import { makeScene2D, Circle, Rect, Txt, Line, Node } from "@motion-canvas/2d";
import { createRef, all, chain, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const f = createRef<Txt>();
    view.add(
        <>
            <Txt ref={f} x={0} y={0} fontSize={300} fill="red"/>
        </>
    );
    yield* chain(
        f().text("0", 1),
        f().text("1", 1),
        f().text("2", 1),
        f().text("3", 1),
        f().text("4", 1),
        f().text("5", 1),
        f().text("6", 1),
        f().text("7", 1),
        f().text("8", 1),
        f().text("9", 1),
        f().text("10", 1),
        waitFor(1)
    )
});

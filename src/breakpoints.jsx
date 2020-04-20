import facepaint from "facepaint";

const breakpoints = [1023,1024];

const mq = facepaint(
    breakpoints.map(bp => `@media (min-width: ${bp}px)`)
)

export default mq;
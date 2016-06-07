const lol = { foo: "bar" };
const lal = { oasd: "1", ooass: "2" };
const xx = Object.assign({}, lol, lal);


const { foo, ooass } = xx;
console.log(ooass);

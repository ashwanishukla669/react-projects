function getUser() {
  return Promise.resolve({
    id: 1,
    name: "Ashwani",
  });
}
getUser()
  .then((user) => {
    return user.name;
  })
  .then((name) => {
    console.log(`Hello ${name}`);
});
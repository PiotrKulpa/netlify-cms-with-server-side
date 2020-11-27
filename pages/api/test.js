export default async function handler(req, res) {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await result.json();
  console.log(data);
  res.json(data)
}
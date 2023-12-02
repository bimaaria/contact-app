export async function GET() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  return Response.json({ data });
}

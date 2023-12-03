export default async function fetcher(url: string) {
  try {
    if (!url.startsWith("http")) {
      url = process.env.NEXTAUTH_URL + url;
    }
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

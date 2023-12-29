export async function GET({ query }) {
  const { id } = query
  return {
    id
  }
}

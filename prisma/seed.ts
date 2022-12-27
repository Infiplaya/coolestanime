import { prisma } from "../src/server/db/client";
import characters from "./characters.json"

async function main() {
    console.log(characters)
    const formattedCharacter = characters.map((c, index) => ({
        id: index + 76,
        name: c.name,
        imageUrl: c.images.jpg.image_url,
    }))
    console.log(formattedCharacter)

  await prisma.character.createMany({
    data: formattedCharacter,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
import { prisma } from "../src/server/db/client";
import characters from "./characters.json"
import animes from "./animes.json"

async function main() {
    //const formattedCharacters = characters.map((c, index) => ({
        //id: index + 76,
        //name: c.name,
        //imageUrl: c.images.jpg.image_url,
    //}))

    const formattedAnimes = animes.map((a, index) => ({
      id: index + 76,
      name: a.title,
      imageUrl: a.images.jpg.image_url,
    }))

  // await prisma.character.createMany({
  //   data: formattedCharacters,
  // });

  await prisma.anime.createMany({
    data: formattedAnimes
  })
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
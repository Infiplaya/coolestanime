import axios from 'axios';
import { prisma } from '../src/server/db/client';

const fillDatabase = async () => {

    for (let i = 1; i < 4; i++) {
        const character = await axios.get(`https://api.jikan.moe/v4/characters/${String(i)}`);

        console.log(character.data)

        for (const char of character.data) {
          const createdChar = await prisma.character.create({
            data: {
              id: i + 1,
              name: char.name,
              imageUrl: char.images.jpg.image_url,
            }
          });
          if (createdChar) {
            console.log(createdChar);
          } else {
            console.error('error creating cat');
          }
        }
    }
}

fillDatabase();
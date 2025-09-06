import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const famousPlants = [
  {
    name: 'Rose',
    description: 'A woody perennial flowering plant of the genus Rosa.',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    hint: 'rose flower',
  },
  {
    name: 'Sunflower',
    description: 'A large annual forb of the genus Helianthus grown as a crop for its edible oil and fruits.',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    hint: 'sunflower field',
  },
  {
    name: 'Oak Tree',
    description: 'A tree or shrub in the genus Quercus of the beech family, Fagaceae.',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    hint: 'oak tree',
  },
    {
    name: 'Lavender',
    description: 'A genus of 47 known species of flowering plants in the mint family, Lamiaceae.',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    hint: 'lavender field',
  },
  {
    name: 'Cherry Blossom',
    description: 'The flower of any of several trees of genus Prunus, particularly the Japanese cherry.',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    hint: 'cherry blossom',
  },
  {
    name: 'Maple Tree',
    description: 'A genus of trees or shrubs in the soapberry family, Sapindaceae.',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    hint: 'maple leaf',
  }
];

export default function FamousPlants() {
  return (
    <div className="animate-in fade-in-50">
      <h2 className="mb-4 text-2xl font-bold text-center font-headline text-primary">
        Explore Famous Flora
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {famousPlants.map((plant, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src={plant.imageUrl}
                alt={`Image of ${plant.name}`}
                width={400}
                height={300}
                className="object-cover w-full h-48"
                data-ai-hint={plant.hint}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl">{plant.name}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">{plant.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

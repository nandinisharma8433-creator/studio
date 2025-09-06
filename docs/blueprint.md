# **App Name**: FloraSnap

## Core Features:

- Image Upload & Identification: Allows users to upload a plant image.  The image is processed using generative AI, identifying the plant and returning available data fields. It implements a 'tool' to select alternate models or retry failed requests.
- Text-Based Search: Enables users to search for plants by common or scientific name (English or Hindi).  Search queries are processed using generative AI to retrieve plant data and displayed to the user, taking model quota and API errors into consideration by way of the 'tool' it relies on.
- Detailed Plant Information Display: Presents structured data fields (common name, scientific name, family, synonyms, taxonomy, habitat, distribution, flowering period, fruiting period, care instructions, uses, toxicities, and conservation status) in a clean, readable format.
- History Management (Local): Maintains a local history of user search queries, with the ability to reload previous search results from local storage.

## Style Guidelines:

- Primary color: Forest Green (#388E3C), evoking nature and growth.
- Background color: Light Green (#E8F5E9), providing a soft, natural backdrop.
- Accent color: Earth Brown (#795548), complementing the green palette and highlighting key elements.
- Font pairing: 'PT Sans' (sans-serif) for body text and 'Alegreya' (serif) for headlines, providing a balance of readability and elegance.
- Use clear, simple icons to represent different plant categories, care instructions, and uses.
- Emphasize a mobile-first design approach. Plant cards displayed as full-width on narrow screens and arranged in a grid on larger screens.
- Use subtle transitions when loading search results and displaying detailed plant information to enhance the user experience.
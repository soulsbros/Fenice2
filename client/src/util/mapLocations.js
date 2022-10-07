// note: marker name must start with a capital letter (Blue, Red, Green, Yellow)

const mapLocations = {
  lore: [
    {
      name: 'Algamat',
      position: [57.810164, 1.604004],
      description: 'A dwarven mountain city, home of Agna Ironbreaker',
      marker: 'Red',
    },
    {
      name: 'Bassomonte',
      position: [50.685017, 1.691895],
      description: "A small village in the woods, birthplace of Alan'divir",
      marker: 'Red',
    },
    {
      name: 'Eredar',
      position: [54.533066, -19.929199],
      description: "Morgrym's birthplace, a fallen underground dwarven city",
      marker: 'Red',
    },
    {
      name: 'Torch',
      position: [53.97, -0.4556],
      description: "Rok's birthplace, somewhere in the Numerian region",
      marker: 'Red',
    },
  ],
  itinerary: [
    {
      name: 'Haska',
      position: [37.147965, -18.759155],
      description: 'A small port city where we started our journey',
      marker: 'Blue',
      dateVisited: '18th of Desnus 4722',
    },
    {
      name: 'Hermea',
      position: [44.78, -31.4587],
      description: "A peculiar little island, hideout of the Corvi. Don't stay for dinner!",
      marker: 'Blue',
      dateVisited: '2nd - 11th of Sarenith',
    },
    {
      name: 'Nisroch',
      position: [44.504486, -21.470032],
      description: 'Kaboom!',
      marker: 'Blue',
      dateVisited: '16th - 22nd of Sarenith',
    },
    {
      name: 'Taggun Hold',
      position: [41.605021, -17.281494],
      description: 'A lizardfolk-inhabited small village, where we found Yvonne',
      marker: 'Blue',
      dateVisited: '6th of Erastus',
    },
    {
      name: 'Longacre',
      position: [39.189552, -16.040039],
      description: 'A big, spider-protected city, complete with a dwarven forge',
      marker: 'Blue',
      dateVisited: '11th - 15th of Erastus',
    },
    {
      name: 'Senara',
      position: [40.338234, -12.821045],
      description:
        'A small gracious town, filled with halflings. For the love of everything, play dice with them...',
      marker: 'Blue',
      dateVisited: '8th of Erastus',
    },
    {
      name: 'Misarias',
      position: [40.61308617898251, -11.005554199218752],
      description: 'A fortified city where we met Alkest, Kurbas, and Nok Nok',
      marker: 'Blue',
      dateVisited: '18th - 19th of Erastus',
    },
    {
      name: `Haugin's Ear`,
      position: [40.49206477636645, -9.115905761718752],
      description: 'A small cursed village, where everyone has been turned into a fox',
      marker: 'Blue',
      dateVisited: '19th of Erastus',
    },
    {
      name: `Goblin City`,
      position: [40.36771970021672, -8.041992187500002],
      description: `An underground goblin city that we kinda failed to reclaim`,
      marker: 'Blue',
      dateVisited: '19th - 21st of Erastus',
    },
    {
      name: `Piren's Bluff`,
      position: [40.07611648280531, -7.012023925781251],
      description: `Small village of farmers that have never seen giant spiders before`,
      marker: 'Blue',
      dateVisited: '24th - 25th of Erastus',
    },
    {
      name: `Oregent`,
      position: [39.77557811645709, -4.724121093750001],
      description: `Big ass fancy city, lawful good - naked elves on rooftops included!`,
      marker: 'Blue',
      dateVisited: '26th - 28th of Erastus',
    },
    {
      name: 'Yleste',
      position: [35.424698, 0.002747],
      description: 'The city where we will find the stars!',
      marker: 'Blue',
      dateVisited: '28th of Erastus - now',
    },
  ],
  futureItinerary: [],
};

const itineraryPoints = [
  mapLocations.itinerary[0].position, // haska
  [36.772825, -18.775635],
  [36.251741, -18.896484],
  [35.905, -19.709473],
  [35.67305019949054, -20.753173828125004],
  [35.65519456953668, -22.093505859375004],
  [35.1805681385568, -24.4775390625],
  [35.04576706203004, -25.686035156250004],
  [35.091244974346935, -29.24560546875],
  [36.10979884567637, -31.311035156250004],
  [37.958886402547414, -32.58544921875001],
  [41.83517393053566, -32.73925781250001],
  mapLocations.itinerary[1].position, // hermea
  [44.550353966918415, -27.630615234375004],
  [44.53468990918318, -23.433837890625],
  mapLocations.itinerary[2].position, // nisroch
  [42.32963916706959, -19.714965820312504],
  [42.21580300038766, -19.16015625],
  [42.19138278908477, -18.017578125000004],
  [41.91804946153272, -17.627563476562504],
  mapLocations.itinerary[3].position, // taggun hold
  [40.76171032637198, -16.921691894531254],
  [39.57991247522404, -16.625061035156254],
  [39.23817939461033, -16.405334472656254],
  mapLocations.itinerary[4].position, // longacre
  [39.384801809260864, -16.012573242187504],
  [39.36810337603894, -15.913696289062502],
  [39.30223396006419, -15.814819335937502],
  [39.2852253282366, -15.721435546875002],
  [39.29373016061767, -15.597839355468752],
  [39.304359748522536, -15.512695312500002],
  [39.30010810704354, -15.422058105468752],
  [39.27246614304812, -15.3863525390625],
  [39.23843028920794, -15.369873046875002],
  [39.19332531517256, -15.356140136718752],
  [39.15712087728972, -15.323181152343752],
  [39.12343733840353, -15.243530273437502],
  [39.110648734645515, -15.188598632812502],
  [39.10384519811482, -15.133666992187502],
  [39.056929268623854, -15.023803710937502],
  [39.00571267944997, -15.032043457031252],
  [38.96086772304635, -15.010070800781252],
  [38.943897202060725, -14.941406250000002], // river split
  [38.99357965873831, -14.908447265625002],
  [39.10384519811482, -14.872741699218752],
  [39.19758343516511, -14.691467285156252],
  [39.252915508999024, -14.699707031250002],
  [39.35920070301351, -14.636535644531252],
  [39.39317786836978, -14.595336914062502],
  [39.39317786836978, -14.507446289062502],
  [39.4356260674389, -14.408569335937502],
  [39.50772867869755, -14.414062500000002],
  [39.647479180737676, -14.482727050781252],
  [39.75527514342143, -14.526672363281252],
  [39.86290266560413, -14.444274902343752],
  [39.9113854259946, -14.282226562500002],
  [39.879770123244526, -13.974609375000002],
  [39.85446738144659, -13.642272949218752],
  [39.957728152372646, -13.47747802734375],
  [40.029286995670766, -13.205566406250002],
  [40.071345404304175, -13.101196289062502],
  [40.21649546047083, -13.0078125],
  [40.274960358258475, -12.834777832031252],
  mapLocations.itinerary[5].position, // senara
  [40.402713395541056, -12.32666015625],
  [40.52210173747721, -11.914672851562502],
  mapLocations.itinerary[6].position, // misarias
  [40.536824156415335, -10.71441650390625],
  mapLocations.itinerary[7].position, // haugin's ear
  mapLocations.itinerary[8].position, // goblin city
  mapLocations.itinerary[9].position, // piren's bluff
  [39.8431232338646, -6.097412109375001],
  [39.76437609565462, -5.333862304687501],
  mapLocations.itinerary[10].position, // oregent
  [38.85390916714615, -3.7792968750000004],
  [38.39891804079242, -2.9333496093750004], //almas
  mapLocations.itinerary[11].position, // yleste
];

const futureItineraryPoints = [];

export { mapLocations, itineraryPoints, futureItineraryPoints };

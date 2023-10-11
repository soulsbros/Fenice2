/* 
  Important notes:
  - marker name must start with a capital letter (Blue, Red, Green, Yellow)
  - don't sort the mapLocations arrays!
*/

// those appear on the list under the map
const mapLocations = {
  lore: [
    {
      name: "Algamat",
      position: [57.810164, 1.604004],
      description: "A dwarven mountain city, home of Agna Ironbreaker",
      marker: "Red",
    },
    {
      name: "Bassomonte",
      position: [47.954809896971966, 2.5708007812500004],
      description: "A small village in the woods, birthplace of Alan'divir",
      marker: "Red",
    },
    {
      name: "Eredar",
      position: [54.533066, -19.929199],
      description: "Morgrym's birthplace, a fallen underground dwarven city",
      marker: "Red",
    },
    {
      name: "Torch",
      position: [53.97, -0.4556],
      description: "Rok's birthplace, somewhere in the Numerian region",
      marker: "Red",
    },
    {
      name: "Surana Mansion",
      position: [49.174501046221586, 3.6968994140625004],
      description: "A small castle, now home for Alan'divir's family",
      marker: "Red",
    },
  ],
  itinerary: [
    {
      name: "Haska",
      position: [37.147965, -18.759155],
      description: "A small port city where we started our journey",
      marker: "Blue",
      dateVisited: "18th of Desnus 4722",
    },
    {
      name: "Hermea",
      position: [44.78, -31.4587],
      description:
        "A peculiar little island, hideout of the Corvi. Don't stay for dinner!",
      marker: "Blue",
      dateVisited: "2nd - 11th of Sarenith",
    },
    {
      name: "Nisroch",
      position: [44.504486, -21.470032],
      description: "Kaboom!",
      marker: "Blue",
      dateVisited: "16th - 22nd of Sarenith",
    },
    {
      name: "Taggun Hold",
      position: [41.605021, -17.281494],
      description:
        "A lizardfolk-inhabited small village, where we found Yvonne",
      marker: "Blue",
      dateVisited: "6th of Erastus",
    },
    {
      name: "Longacre",
      position: [39.189552, -16.040039],
      description:
        "A big, spider-protected city, complete with a dwarven forge",
      marker: "Blue",
      dateVisited: "11th - 15th of Erastus",
    },
    {
      name: "Senara", // 5
      position: [40.338234, -12.821045],
      description:
        "A small gracious town, filled with halflings. For the love of everything, play dice with them...",
      marker: "Blue",
      dateVisited: "8th of Erastus",
    },
    {
      name: "Misarias",
      position: [40.61308617898251, -11.005554199218752],
      description: "A fortified city where we met Alkest, Kurbas, and Nok Nok",
      marker: "Blue",
      dateVisited: "18th - 19th of Erastus",
    },
    {
      name: `Haugin's Ear`,
      position: [40.49206477636645, -9.115905761718752],
      description:
        "A small cursed village, where everyone has been turned into a fox",
      marker: "Blue",
      dateVisited: "19th of Erastus",
    },
    {
      name: `Goblin City`,
      position: [40.36771970021672, -8.041992187500002],
      description: `An underground goblin city that we kinda failed to reclaim`,
      marker: "Blue",
      dateVisited: "19th - 21st of Erastus",
    },
    {
      name: `Piren's Bluff`,
      position: [40.07611648280531, -7.012023925781251],
      description: `Small village of farmers that have never seen giant spiders before`,
      marker: "Blue",
      dateVisited: "24th - 25th of Erastus",
    },
    {
      name: `Oregent`, // 10
      position: [39.77557811645709, -4.724121093750001],
      description: `Big ass fancy city, lawful good - naked elves on rooftops included!`,
      marker: "Blue",
      dateVisited: "26th - 28th of Erastus",
    },
    {
      name: "Yleste",
      position: [35.424698, 0.002747],
      description: "The city where we found the stars! And a civil war.",
      marker: "Blue",
      dateVisited: "28th of Erastus - 3rd of Arodus",
    },
    {
      name: "Almas",
      position: [38.39891804079242, -2.9333496093750004],
      description: "A small portuary city very keen on freeing slaves",
      marker: "Blue",
      dateVisited: "6th - 7th of Arodus",
    },
    {
      name: `Oregent`,
      position: [39.77557811645709, -4.724121093750001],
      description: `Back to where we met Kienzou, to deliver 890 gnomes`,
      marker: "Blue",
      dateVisited: "9th of Arodus",
    },
    {
      name: `Sauerton`,
      position: [41.52082596645194, -2.3538208007812504],
      description: `Wine!`,
      marker: "Blue",
      dateVisited: "10th - 11th of Arodus",
    },
    {
      name: `Caldamin`, // 15
      position: [43.14717317571153, -1.7111206054687502],
      description: `Golem fight!`,
      marker: "Blue",
      dateVisited: "12th of Arodus",
    },
    {
      name: `Voluse`,
      position: [46.78106814715621, -1.7935180664062502],
      description: `The River Kingdoms capital, very well hidden`,
      marker: "Blue",
      dateVisited: "17th - 25th of Arodus",
    },
    {
      name: `Novoboro`,
      position: [48.10896394246189, 0.5163574218750001],
      description: `A small trader outpost`,
      marker: "Blue",
      dateVisited: "28th of Arodus",
    },
    {
      name: "Surana Mansion",
      position: [49.174501046221586, 3.6968994140625004],
      description: "A small castle, now home for Alan'divir's family",
      marker: "Red",
      dateVisited: "31th of Arodus - 2nd of Rova",
    },
    {
      name: `Heibarr`,
      position: [51.36312191813004, 0.6591796875000001],
      description: `A ghost town - don't fall in the river...`,
      marker: "Blue",
      dateVisited: "10th - 11th of Rova",
    },
    {
      name: `Hajoth Hakados`, // 20
      position: [52.50344835343625, 1.1645507812500002],
      description: `An android-welcoming city with shiny metals`,
      marker: "Blue",
      dateVisited: "14th - 17th of Rova",
    },
    {
      name: "Torch",
      position: [53.97, -0.4556],
      description: "Rok's birthplace, somewhere in the Numerian region",
      marker: "Red",
      dateVisited: "22th - 23rd of Rova",
    },
    {
      name: "Algamat",
      position: [53.97, -0.4556],
      description: "A dwarven mountain city, home of Agna Ironbreaker",
      marker: "Red",
      dateVisited: "4th of Lamashan - now",
    },
  ],
  futureItinerary: [],
};

// from here on, those make up the path on the map
const itineraryPoints = [
  [
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
  ],
  // teleportPoints[0]
  [
    mapLocations.itinerary[11].position, // yleste
    [35.083197344381354, -0.45043945312500006],
    [34.7408130249938, -1.4392089843750002],
    [35.226931393036025, -2.3730468750000004],
    [36.021800808977076, -2.4060058593750004],
    [36.53553781229621, -2.3181152343750004],
    [37.52668563938752, -2.39501953125],
    [38.032811766168244, -2.6147460937500004],
    [38.22296164083377, -2.8207397460937504],
    mapLocations.itinerary[12].position, // almas
    [38.5179546641263, -3.0184936523437504],
    [38.68754114509083, -2.92510986328125],
    [38.75397369949193, -2.9910278320312504],
    [38.788244146655764, -3.1146240234375004],
    [38.7539782156551, -3.2794189453125004],
    [38.7539782156551, -3.4085083007812504],
    [39.0596457092808, -3.5980224609375],
    [39.13425433809257, -3.7435913085937504],
    [39.24921679427939, -3.7271118164062504],
    [39.42979498389664, -3.7023925781250004],
    [39.595091348773806, -3.7326049804687504],
    [39.69027566940871, -3.8314819335937504],
    [39.72831270705536, -3.9907836914062504],
    [39.82120382448859, -4.042968750000001],
    [39.835970396764054, -4.292907714843751],
    [39.79166115861319, -4.559326171875001],
    [39.79784550105204, -4.677429199218751], // oregent
    [39.844252770642534, -4.680175781250001],
    [39.814718788956455, -4.622497558593751],
    [39.816828780146906, -4.551086425781251],
    [39.87799034335368, -4.457702636718751],
    [39.882206373585134, -4.323120117187501],
    [39.87799034335368, -4.128112792968751],
    [39.87799034335368, -4.042968750000001],
    [39.930672088544604, -3.9605712890625004],
    mapLocations.itinerary[14].position, //sauerton
    mapLocations.itinerary[15].position, //caldamin
    [44.018304412360614, -1.0574340820312502],
    [44.449342313758365, -0.47790527343750006],
    [44.77396129580383, -0.19500732421875],
    [45.14712450970179, -0.030212402343750003],
    [45.677427564291605, -0.05218505859375001],
    [46.05030928672157, -0.46966552734375006], //lethaquel
  ],
  // teleportPoints[1]
  // teleportPoints[2]
  [
    [45.76360016272612, -2.0379638671875004], //thorn's end
    [45.43109788291079, -2.0544433593750004], //arabrecht
  ],
  // teleportPoints[3]
  // teleportPoints[4]
  [
    [46.921987020980595, -0.5630493164062501], // caruskei
    [47.05128751683927, -0.12908935546875003],
    [47.098058340017, 0.17028808593750003],
    [47.17654092066638, 0.30761718750000006],
    [47.48560063610646, 0.32684326171875006],
    [47.72452519217648, 0.25543212890625006],
    [47.89241262723576, 0.21697998046875003],
    [48.04874049440941, 0.33233642578125],
    [48.103639322800625, 0.5355834960937501], // novoboro
    [48.832110872727704, 2.2302246093750004],
    [49.10074890601479, 3.02398681640625],
    mapLocations.lore[4].position, // surana mansion
    [49.48758183946942, 3.3013916015625004],
    [49.59825047928544, 3.2821655273437504],
    [49.67103148861441, 3.197021484375],
    [49.81658593100351, 2.9141235351562504],
    [49.894508339870015, 2.6916503906250004],
    [49.882119997419615, 2.5241088867187504],
    [50.05176050201445, 2.3922729492187504],
    mapLocations.itinerary[19].position, // hajoth hakados // heibarr
    [51.4916327007008, 0.5877685546875001],
    mapLocations.itinerary[20].position, // hajoth hakados
    mapLocations.lore[3].position, // torch
    [56.51682275378103, -0.34057617187500006],
    mapLocations.lore[0].position, // algamat
  ],
];

const teleportPoints = [
  [
    mapLocations.itinerary[10].position, // oregent
    mapLocations.itinerary[11].position, // yleste
  ],
  [
    [46.05030928672157, -0.46966552734375006], //lethaquel
    mapLocations.itinerary[16].position, // voluse
  ],
  [
    mapLocations.itinerary[16].position, // voluse
    [45.76360016272612, -2.0379638671875004], //thorn's end
  ],
  [
    [45.43109788291079, -2.0544433593750004], //arabrecht
    mapLocations.itinerary[16].position, // voluse
  ],
  [
    mapLocations.itinerary[16].position, // voluse
    [46.921987020980595, -0.5630493164062501], // caruskei
  ],
];

const futureItineraryPoints: number[][][] = [];

export { futureItineraryPoints, itineraryPoints, mapLocations, teleportPoints };

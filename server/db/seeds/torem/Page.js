let slides = [
  {
    id: 1,
    title: "Import",
    content: [
      {
        type: "header",
        data: {
          text: "IMPORTEZ VOS MARCHANDISES À PARTIR DE L’ALGÉRIE",
          level: 3,
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Sarl TRANSMED est devenue un leader incontournable en matière d’Exportation de marchandises à partir de l’Algérie, nous exportons vers toutes les destinations et principalement vers l’Afrique.",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Nous exportons déjà pour le compte de nos clients, différents articles de grande consommation vers Abidjan et très prochainement vers Nouakchott et Dakar…",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Toujours en quête d’excellence et de satisfaction client, nous lancerons très prochainement le service Groupage afin de proposer une prestation complète adapté pour chaque client.",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Pour vous guider et en savoir plus sur nos offres, vous pouvez nous contacter et on se fera un plaisir de vous accompagner.<br>",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Export",
    content: [
      {
        type: "header",
        data: {
          text: "EXPORTEZ VOS MARCHANDISES À PARTIR DE L’ALGÉRIE",
          level: 3,
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Sarl TRANSMED est devenue un leader incontournable en matière d’Exportation de marchandises à partir de l’Algérie, nous exportons vers toutes les destinations et principalement vers l’Afrique.",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Nous exportons déjà pour le compte de nos clients, différents articles de grande consommation vers Abidjan et très prochainement vers Nouakchott et Dakar…",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Toujours en quête d’excellence et de satisfaction client, nous lancerons très prochainement le service Groupage afin de proposer une prestation complète adapté pour chaque client.",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Pour vous guider et en savoir plus sur nos offres, vous pouvez nous contacter et on se fera un plaisir de vous accompagner.<br>",
        },
      },
    ],
  },
];
module.exports = async function (SlideShow) {
  SlideShow.bulkCreate(slides)
    .then((items) => {
      // console.log(items);
    })
    .catch((err) => {
      console.log("error : seeds usr");
    });
};

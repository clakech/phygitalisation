angular.module('data', []).constant('Data', {

        products: [
            {
                id: 1,
                name: '15 chevilles + vis 14x55mm',
                price: 41.90,
                type: 'frapper',
                wall: ['creux', 'plein'],
                load: ['lourd'],
                image: '15-chevilles-vis-a-expansion-outifix-14x55mm-pour-multi-materiaux.jpg'
            },
            {
                id: 2,
                name: '2 Chevilles + tirefonds 14 x 80mm',
                price: 3.80,
                type: 'expansion',
                wall: ['plein'],
                load: ['lourd'],
                image: '2-chevilles-tirefonds-a-expansion-standers-14-x-80mm-pour-materiaux-pleins.jpg'
            },
            {
                id: 3,
                name: '10 chevilles + vis 4x30mm',
                price: 3.65,
                type: 'clouer',
                wall: ['creux'],
                load: ['leger'],
                image: '10-chevilles-vis-a-clouer-standers-4x30mm-pour-materiaux-creux.jpg'
            },
            {
                id: 4,
                name: '2 chevilles + vis 15x50mm',
                price: 6.95,
                type: 'expansion',
                wall: ['plein'],
                load: ['lourd'],
                image: '2-chevilles-vis-a-expansion-fischer-15x50mm-pour-materiaux-pleins.jpg'
            },
            {
                id: 5,
                name: '8 Chevilles + vis à visser 13 x 31mm',
                price: 2.65,
                type: 'visser',
                wall: ['creux'],
                load: ['leger'],
                image: '8-chevilles-vis-a-visser-standers-13-x-31mm.jpg'
            },
            {
                id: 6,
                name: '60 chevilles à frapper 6x40',
                price: 7.10,
                type: 'clouer',
                wall: ['plein'],
                load: ['lourd'],
                image: '60-chevilles-vis-a-frapper-standers-6-x-40mm.jpg'
            },
            {
                id: 7,
                name: '75 chevilles à frapper 6x80',
                price: 11.50,
                type: 'clouer',
                wall: ['plein'],
                load: ['lourd'],
                image: '75-chevilles-vis-a-frapper-standers-6-x-80mm.jpg'
            },
            {
                id: 8,
                name: '20 chevilles à frapper 5x30',
                price: 4.10,
                type: 'clouer',
                wall: ['plein'],
                load: ['lourd'],
                image: '20-chevilles-vis-a-frapper-standers-5-x-30mm.jpg'
            },
            {
                id: 9,
                name: '50 chevilles + vis à expansion 4x40',
                price: 6.12,
                type: 'expansion',
                wall: ['creux'],
                load: ['lourd'],
                image: '50-chevilles-vis-a-expansion-8-x-32mm.jpg'
            },
            {
                id: 10,
                name: '50 chevilles + vis à expansion 5x40',
                price: 7.10,
                type: 'expansion',
                wall: ['creux'],
                load: ['lourd'],
                image: '50-chevilles-vis-a-expansion-8-x-32mm.jpg'
            },
            {
                id: 11,
                name: '50 chevilles + vis à expansion 6x40',
                price: 8.10,
                type: 'expansion',
                wall: ['creux'],
                load: ['lourd'],
                image: '50-chevilles-vis-a-expansion-8-x-32mm.jpg'
            },
            {
                id: 12,
                name: '50 chevilles + vis à expansion 6x45',
                price: 9.10,
                type: 'expansion',
                wall: ['creux'],
                load: ['lourd'],
                image: '50-chevilles-vis-a-expansion-8-x-32mm.jpg'
            },
            {
                id: 13,
                name: '50 chevilles + vis à expansion 6x58',
                price: 10.10,
                type: 'expansion',
                wall: ['creux'],
                load: ['lourd'],
                image: '50-chevilles-vis-a-expansion-8-x-32mm.jpg'
            },
            {
                id: 14,
                name: '20 Chevilles + vis 9 x 27mm',
                price: 2.65,
                type: 'visser',
                wall: ['creux'],
                load: ['leger'],
                image: '20-chevilles-vis-a-visser-standers-9-x-27mm.jpg'
            },
            {
                id: 15,
                name: '25 chevilles à expansion 6x25mm',
                price: 2.95,
                type: 'expansion',
                wall: ['creux', 'plein'],
                load: ['leger'],
                image: '25-chevilles-a-expansion-red-head-6x25mm-pour-tous-types-de-materiaux.jpg'
            },
            {
                id: 16,
                name: '10 chevilles + vis à expansion 10 x 50 mm',
                price: 2.70,
                type: 'expansion',
                wall: ['creux', 'plein'],
                load: ['leger'],
                image: '10-chevilles-vis-a-expansion-ou-a-verrouillage-de-forme-standers-8-x-50mm.jpg'
            },
            {
                id: 17,
                name: '100 chevilles rouges + vis 6 mm',
                price: 3.70,
                type: 'expansion',
                wall: ['creux', 'plein'],
                load: ['leger'],
                image: 'assortiment-de-130-chevilles-vis-a-expansion-red-head.jpg'
            },
            {
                id: 18,
                name: '100 chevilles bleus + vis 8 mm',
                price: 4.70,
                type: 'expansion',
                wall: ['creux', 'plein'],
                load: ['leger'],
                image: 'assortiment-de-130-chevilles-vis-a-expansion-red-head.jpg'
            },
            {
                id: 19,
                name: '100 chevilles beige + vis 5 mm',
                price: 2.70,
                type: 'expansion',
                wall: ['creux', 'plein'],
                load: ['leger'],
                image: 'cheville-plastique-crampon.jpg'
            },
            {
                id: 20,
                name: '50 chevilles à clouer 5 mm',
                price: 1.40,
                type: 'clouer',
                wall: ['creux', 'plein'],
                load: ['leger'],
                image: 'cheville-a-clouer.jpg'
            }
        ]
      ,
        criteriaById: {
            'wall': {
                id: 'wall',
                description: 'Type de mur',
                segment: [
                    {
                        description: 'plein',
                        image: 'plein.jpg'
                    },
                    {
                        description: 'creux',
                        image: 'creux.jpg'
                    }
                ]
            },
            'load': {
                id: 'load',
                description: 'Poids',
                segment: [
                    {
                        description: 'lourd',
                        image: 'poids-lourd.jpeg'
                    },
                    {
                        description: 'leger',
                        image: 'poids-leger.jpeg'
                    }
                ]
            }
        }
    }
);
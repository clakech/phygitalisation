angular.module('data',[]).constant('Data', {
        products: [
            {
                id: 1,
                name: 'Chevilles + vis à visser RED HEAD, 12 x 30mm',
                price: 0.75,
                type: 'visser',
                wall: ['platre'],
                load: 'medium',
                image: '4-chevilles-vis-a-visser-red-head-12-x-30mm.jpg'
            },
            {
                id: 2,
                name: 'Chevilles + vis à frapper STANDERS, 5 x 30mm',
                price: 0.15,
                type: 'frapper',
                wall: ['plein'],
                load: 'heavy',
                image: '4-chevilles-vis-a-visser-red-head-12-x-30mm.jpg'
            },
            {
                id: 3,
                name: 'Chevilles à clouer OUTIFIX 6x40mm pour tous types de matériaux',
                price: 0.20,
                type: 'clouer',
                wall: ['platre','plein'],
                load: 'medium',
                image: '25-chevilles-a-clouer-outifix-6x40mm-pour-tous-types-de-materiaux.jpg'
            },
        ],
        criteriaById: {
            '123': {
                description: 'Type de mur',
                segment: [
                    {
                        description: 'plein',
                        image: 'http://ser36.ovh.wikeo.webadeo.net/images/49/9d/poncage.jpg'
                    },
                    {
                        description: 'creux',
                        image: 'http://ser36.ovh.wikeo.webadeo.net/images/49/9d/poncage.jpg'
                    }
                ]
            },
            '456': {
                description: 'poids',
                segment: [
                    {
                        description: 'lourd',
                        image: 'http://ser36.ovh.wikeo.webadeo.net/images/49/9d/poncage.jpg'
                    },
                    {
                        description: 'leger',
                        image: 'http://ser36.ovh.wikeo.webadeo.net/images/49/9d/poncage.jpg'
                    }
                ]
            }
        }
    }
);
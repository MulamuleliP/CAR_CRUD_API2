document.addEventListener("alpine:init", () => {
    Alpine.data('nissan', () => ({
        title: 'car crud',
        nissanCount: null,
        cars: [],
        newCar: {
            color: '',
            make: '',
            model: '',
            reg_number: ''
        },
        deleteRegNumber: '',

        fetchNissanCount() {
            axios.get('http://localhost:3007/api/nissansFromCK')
                .then(response => {
                    this.nissanCount = response.data.count;
                })
                .catch(error => {
                    console.error('Error retrieving Nissan data:', error);
                    this.nissanCount = null;
                });
        },

        fetchCars() {
            axios.get('http://localhost:3007/api/cars')
                .then(response => {
                    this.cars = response.data;
                })
                .catch(error => {
                    console.error('Unable to retrieve car list:', error);
                });
        },

        addCar() {
            axios.post('http://localhost:3007/api/cars', this.newCar)
                .then(response => {
                    if (response.status === 200) {
                        this.newCar = { color: '', make: '', model: '', reg_number: '' };
                        this.fetchCars(); 
                    } else {
                        throw new Error('Car not added');
                    }
                })
                .catch(error => {
                    console.error('Failed to add car to list:', error);
                });
        },

        deleteCar() {
            axios.delete(`http://localhost:3007/api/cars/${encodeURIComponent(this.deleteRegNumber)}`)
                .then(response => {
                    if (response.status === 200) {
                        this.deleteRegNumber = '';
                        this.fetchCars(); 
                    } else {
                        throw new Error('Failed to remove car from list');
                    }
                })
                .catch(error => {
                    console.error('Unable to remove car:', error);
                });
        }
    }));
});

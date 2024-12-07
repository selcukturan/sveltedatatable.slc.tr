import { browser } from '$app/environment';

export default class common {
	static randomString(length?: number): string {
		length = length || 10;

		let result = '';
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		}

		return result;
	}

	static isInput(element: HTMLElement): boolean {
		const tagName = element && element.tagName ? element.tagName.toLowerCase() : '';

		return (
			tagName === 'input' ||
			tagName === 'select' ||
			tagName === 'textarea' ||
			element?.isContentEditable
		);
	}

	static isFocusable(element: HTMLElement): boolean {
		const tagName = element && element.tagName ? element.tagName.toLowerCase() : '';

		return (
			common.isInput(element) ||
			tagName === 'button' ||
			tagName === 'a' ||
			tagName === 'details' ||
			element?.tabIndex >= 0
		);
	}

	static generateExampleData(count: number) {
		if (!browser) return [];
		const grape = [
			'Merlot',
			'Chardonnay',
			'Pinot Noir',
			'Syrah',
			'Sauvignon Blanc',
			'Zinfandel',
			'Grenache',
			'Viognier',
			'Boğazkere',
			'Kalecik Karası',
			'Öküzgözü',
			'Narince',
			'Emir',
			'Çal Karası',
			'Cabernet Sauvignon',
			'Petit Verdot',
			'Tempranillo',
			'Malbec',
			'Grenache Noir',
			'Cabernet Franc',
			'Fiano',
			'Misket',
			'Sultaniye'
		];
		const producerName = [
			'Ahmet',
			'Mehmet',
			'Ayşe',
			'Fatma',
			'Emre',
			'Hüseyin',
			'Ali',
			'Mustafa',
			'Yusuf',
			'Hasan',
			'Murat',
			'İbrahim',
			'Osman',
			'Ramazan',
			'Süleyman',
			'Bekir',
			'Kemal',
			'Nihat',
			'Okan',
			'Ömer',
			'Uğur',
			'Veli',
			'Ziya',
			'Adem',
			'Bülent',
			'Cem',
			'Deniz',
			'Erdem',
			'Ferhat',
			'Gökhan',
			'Hakan',
			'İsmail',
			'Kadir',
			'Levent',
			'Mert',
			'Nuri',
			'Onur',
			'Pelin',
			'Rıza',
			'Seda',
			'Turan',
			'Ufuk',
			'Vedat',
			'Yıldız',
			'Zafer',
			'Aslı',
			'Bahar',
			'Ceyda',
			'Derya',
			'Ebru',
			'Fikret',
			'Gülay',
			'Hülya',
			'İpek',
			'Jale',
			'Kübra',
			'Leman',
			'Müge',
			'Nazan',
			'Oya',
			'Perihan',
			'Rukiye',
			'Sevil',
			'Tülay',
			'Ülkü',
			'Vildan',
			'Yasemin',
			'Zehra',
			'Aysun',
			'Belgin',
			'Canan',
			'Dilek',
			'Esra',
			'Filiz',
			'Gizem',
			'Hande',
			'Işıl',
			'Jülide',
			'Kadriye',
			'Lale',
			'Melike',
			'Nilgün',
			'Ozan',
			'Pınar',
			'Rabia',
			'Selin',
			'Tuğba',
			'Ümit',
			'Veli',
			'Yavuz',
			'Zeki',
			'Aylin',
			'Burak',
			'Cansu',
			'Damla',
			'Ece'
		];
		const producerSurname = [
			'Yılmaz',
			'Kaya',
			'Demir',
			'Çelik',
			'Şahin',
			'Yıldız',
			'Aydın',
			'Öztürk',
			'Arslan',
			'Doğan',
			'Kılıç',
			'Aslan',
			'Çetin',
			'Korkmaz',
			'Yıldırım',
			'Özkan',
			'Bulut',
			'Kara',
			'Koç',
			'Özer',
			'Acar',
			'Polat',
			'Güler',
			'Güzel',
			'Yalçın',
			'Güneş',
			'Bozkurt',
			'Sarıkaya',
			'Sezer',
			'Eren',
			'Yavuz',
			'Karaca',
			'Işık',
			'Akın',
			'Kurt',
			'Öztürk',
			'Erdem',
			'Koçak',
			'Dinç',
			'Can',
			'Demirel',
			'Erdoğan',
			'Korkut',
			'Sağlam',
			'Özdemir',
			'Bayram',
			'Ergün',
			'Gündüz',
			'Gül',
			'Altun',
			'Bal',
			'Şimşek',
			'Karataş',
			'Duman',
			'Taş',
			'Tunç',
			'Ekinci',
			'Tan',
			'Aksoy',
			'Çakır',
			'Köse',
			'Yalın',
			'Ünal',
			'Çakmak',
			'Baş',
			'Güney',
			'Gökmen',
			'Aksu',
			'Aktaş',
			'Şeker',
			'Tanrıverdi',
			'Bilgin',
			'Kaya',
			'Yener',
			'Alkan',
			'Kaptan',
			'Ergün',
			'Çoban',
			'Bingöl',
			'Coşkun',
			'Ak',
			'Balcı',
			'Ece',
			'Fidan',
			'Genç',
			'İnan',
			'Karaman',
			'Kılıçarslan',
			'Uçar',
			'Özgür',
			'Turhan',
			'Kaya',
			'Demirel',
			'Özgür',
			'Şeker',
			'Öztürk',
			'Yüce',
			'Sarı',
			'Koçak',
			'Özkan'
		];
		const regions = [
			{ province: 'Denizli', district: 'Güney', village: 'Kızılcabölük' },
			{ province: 'Denizli', district: 'Çal', village: 'Selcen' },
			{ province: 'Denizli', district: 'Çal', village: 'Hançalar' },
			{ province: 'Denizli', district: 'Çal', village: 'Süller' },
			{ province: 'Uşak', district: 'Eşme', village: 'Kızılcabölük' },
			{ province: 'Tekirdağ', district: 'Şarköy', village: 'Mürefte' },
			{ province: 'Çanakkale', district: 'Acıpayam', village: 'Kızılcabölük' },
			{ province: 'İzmir', district: 'Menderes', village: 'Kızılcabölük' },
			{ province: 'Manisa', district: 'Acıpayam', village: 'Kızılcabölük' },
			{ province: 'Tokat', district: 'Erbaa', village: 'Kızılcabölük' },
			{ province: 'Nevşehir', district: 'Acıpayam', village: 'Kızılcabölük' },
			{ province: 'Ankara', district: 'Acıpayam', village: 'Kızılcabölük' },
			{ province: 'Elazığ', district: 'Acıpayam', village: 'Kızılcabölük' },
			{ province: 'Malatya', district: 'Acıpayam', village: 'Kızılcabölük' },
			{ province: 'Diyarbakır', district: 'Acıpayam', village: 'Kızılcabölük' }
		];
		const data = [];
		for (let i = 1; i <= count; i++) {
			const region = regions[Math.floor(Math.random() * regions.length)];
			const calcQuantity = Math.floor(Math.random() * 10000);
			const calcPrice = parseFloat((Math.random() * 10).toFixed(2));
			const quantity = calcQuantity === 0 ? 1000 : calcQuantity;
			const price = calcPrice < 1 ? 10 : calcPrice;
			data.push({
				order: i,
				producer: `${producerName[Math.floor(Math.random() * producerName.length)]} ${producerSurname[Math.floor(Math.random() * producerSurname.length)]}`,
				province: region.province,
				district: region.district,
				village: region.village,
				grape: grape[Math.floor(Math.random() * grape.length)],
				grapeColor: i % 2 === 0 ? 'red' : 'white',
				quantity: quantity,
				price: price,
				amount: parseFloat((quantity * price).toFixed(2))
			});
		}
		return data;
	}
}

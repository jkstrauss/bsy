const { createApp } = Vue

function log(val, message) {
	if (message) console.log(message);
	console.log(JSON.stringify(val));
	return val;
}

function start() {
    createApp({
        data() {
            return {
                message: 'Hello Vue!',
				intro: [],
				text: []
            }
        },
		methods: {
			async fetchData() {      
				const response = await (await fetch("./peretz.md")).text();
				this.intro = response.split(/\n\n/)
					.splice(0, 2)
					.map(l => l.replace(/\[.*?\]/g, ''))
					.map(l => l.replace(/# /g, ''))
				
				this.text = response
				.split(/\n/)
			    .splice(4)
				.join('\n')
				.split('\n\n')
				.map(s => s.split('\\\n').map(b => b
					.replace(/(([\u05d0-\u05ea][\u05b0-\u05c2\u05af]*\u05c4)+)/g, '<span style="font-weight: bold">$1</span>')
					.replace(/\u05c4/g, '')))
			}
		},
		mounted() {
			this.fetchData()
		}
    }).mount('#app')
}

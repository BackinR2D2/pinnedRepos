'use strict'

const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

fs.readFile('output.html', 'utf8', (err, data) => {
	if(err) {
		console.log('Error: ' + err);
		return 1;
	}
	const dom = new JSDOM(data);
	const ol = [...((dom.window.document.querySelector('.js-pinned-items-reorder-list').children) || [])];
	const json = ol.map(node => {
		const title = node?.querySelector('span.repo')?.textContent || 'N/A'
		const link = node?.querySelector('a')?.href;
		const desc = node?.querySelector('.pinned-item-desc')?.textContent || 'N/A';
		const programmingLanguage = node?.querySelector('span[itemprop="programmingLanguage"]')?.textContent 
			|| 'N/A';
		const flex1 = node?.querySelector('div.flex-1')?.children;
		let visibility = null;
		if(flex1) {
			visibility = flex1[flex1?.length - 1];
			if(visibility) {
				visibility = visibility?.textContent;
			}
		}

		return {
			title: title?.trim(),
			link: `https://github.com/${link}`,
			desc: desc?.trim(),
			programmingLanguage: programmingLanguage?.trim(),
			visibility: visibility ? visibility?.trim() : 'N/A',
		};
	});
	fs.writeFile('./repos.json', JSON.stringify(json), (err) => {
		if(err) {
			console.log('Error writing JSON: ' + err);
		} else {
			console.log('JSON written successfully');
		}
	});
});

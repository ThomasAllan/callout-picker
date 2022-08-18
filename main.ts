import { App, Editor, FileSystemAdapter, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, SuggestModal } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	notes: boolean;
	abstract: boolean;
	summary: boolean;
	tldr: boolean;
	info: boolean;
	todo: boolean;
	tip: boolean;
	hint: boolean;
	important: boolean;
	success: boolean;
	check: boolean;
	done: boolean;
	question: boolean;
	help: boolean;
	faq: boolean;
	warning: boolean;
	caution: boolean;
	attention: boolean;
	failure: boolean;
	fail: boolean;
	missing: boolean;
	danger: boolean;
	error: boolean;
	bug: boolean;
	example: boolean;
	quote: boolean;
	cite: boolean;

}

const DEFAULT_SETTINGS: MyPluginSettings = {
	notes: true,
	abstract: true,
	summary: true,
	tldr: true,
	info: true,
	todo: true,
	tip: true,
	hint: true,
	important: true,
	success: true,
	check: true,
	done: true,
	question: true,
	help: true,
	faq: true,
	warning: true,
	caution: true,
	attention: true,
	failure: true,
	fail: true,
	missing: true,
	danger: true,
	error: true,
	bug: true,
	example: true,
	quote: true,
	cite: true
}

interface Callout {
	name: string;
}

const ALL_CALLOUTS = [
	{
		name: 'notes',
		icon: 'notes'
	},
	{
		name: 'abstract'
	}
];


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		console.log('Loading Callout Picker')
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new PickerModal(this.app).open();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'insert-callout',
			name: 'Insert a specific callout',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const sel = editor.getSelection()
				
				new PickerModal(this.app).open();
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private addSpanWithText(container: HTMLDivElement, text: string) {
        const configureText: HTMLSpanElement = container.createEl('span');
        configureText.setText(text);
    }
}

class PickerModal extends SuggestModal<Callout> {
	getSuggestions(query: string): Callout[] {
		return ALL_CALLOUTS.filter((callout) => 
			callout.name.toLowerCase().includes(query.toLowerCase())
		);
	}

	// Renders each suggestion item.
	renderSuggestion(callout: Callout, el: HTMLElement) {
		el.createEl("div", { text: callout.name });
	}
	
	// Perform action on the selected suggestion.
	onChooseSuggestion(callout: Callout, evt: MouseEvent | KeyboardEvent) {
	new Notice(`Selected ${callout.name}`);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Select which callouts are shown.'});

		new Setting(containerEl)
			.setName('note')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.notes)
				.onChange(async (value) => { 
					this.plugin.settings.notes = value
					await this.plugin.saveSettings(); 
				})
			)
		new Setting(containerEl)
			.setName('abstract')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.abstract)
				.onChange(async (value) => { 
					this.plugin.settings.abstract = value
					await this.plugin.saveSettings(); 
				})
			)
		new Setting(containerEl)
			.setName('summary')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.summary)
				.onChange(async (value) => { 
					this.plugin.settings.summary = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('tldr')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.tldr)
				.onChange(async (value) => { 
					this.plugin.settings.tldr = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('info')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.info)
				.onChange(async (value) => { 
					this.plugin.settings.info = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('todo')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.todo)
				.onChange(async (value) => { 
					this.plugin.settings.todo = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('tip')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.tip)
				.onChange(async (value) => { 
					this.plugin.settings.tip = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('hint')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.hint)
				.onChange(async (value) => { 
					this.plugin.settings.hint = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('important')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.important)
				.onChange(async (value) => { 
					this.plugin.settings.important = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('success')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.success)
				.onChange(async (value) => { 
					this.plugin.settings.success = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('check')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.check)
				.onChange(async (value) => { 
					this.plugin.settings.check = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('done')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.done)
				.onChange(async (value) => { 
					this.plugin.settings.done = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('question')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.question)
				.onChange(async (value) => { 
					this.plugin.settings.question = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('help')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.help)
				.onChange(async (value) => { 
					this.plugin.settings.help = value
					await this.plugin.saveSettings(); 
				})
		)
				new Setting(containerEl)
			.setName('todo')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.todo)
				.onChange(async (value) => { 
					this.plugin.settings.todo = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('tip')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.tip)
				.onChange(async (value) => { 
					this.plugin.settings.tip = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('hint')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.hint)
				.onChange(async (value) => { 
					this.plugin.settings.hint = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('important')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.important)
				.onChange(async (value) => { 
					this.plugin.settings.important = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('success')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.success)
				.onChange(async (value) => { 
					this.plugin.settings.success = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('check')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.check)
				.onChange(async (value) => { 
					this.plugin.settings.check = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('done')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.done)
				.onChange(async (value) => { 
					this.plugin.settings.done = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('question')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.question)
				.onChange(async (value) => { 
					this.plugin.settings.question = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('help')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.help)
				.onChange(async (value) => { 
					this.plugin.settings.help = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('faq')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.faq)
				.onChange(async (value) => { 
					this.plugin.settings.faq = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('warning')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.warning)
				.onChange(async (value) => { 
					this.plugin.settings.warning = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('caution')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.caution)
				.onChange(async (value) => { 
					this.plugin.settings.caution = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('attention')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.attention)
				.onChange(async (value) => { 
					this.plugin.settings.attention = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('failure')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.failure)
				.onChange(async (value) => { 
					this.plugin.settings.failure = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('fail')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.fail)
				.onChange(async (value) => { 
					this.plugin.settings.fail = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('missing')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.missing)
				.onChange(async (value) => { 
					this.plugin.settings.missing = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('danger')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.danger)
				.onChange(async (value) => { 
					this.plugin.settings.danger = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('error')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.error)
				.onChange(async (value) => { 
					this.plugin.settings.error = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('bug')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.bug)
				.onChange(async (value) => { 
					this.plugin.settings.bug = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('example')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.example)
				.onChange(async (value) => { 
					this.plugin.settings.example = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('quote')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.quote)
				.onChange(async (value) => { 
					this.plugin.settings.quote = value
					await this.plugin.saveSettings(); 
				})
		)
		new Setting(containerEl)
			.setName('cite')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.cite)
				.onChange(async (value) => { 
					this.plugin.settings.cite = value
					await this.plugin.saveSettings(); 
				})
		)
	}
}

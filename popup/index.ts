import {IInputs, IOutputs} from "./generated/ManifestTypes";
// import Quill from 'quill'

export class popup implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	name:HTMLInputElement;
	
	btn:HTMLButtonElement
	btnclose:HTMLButtonElement
	_notifyOutputChanged: () => void
	_context: ComponentFramework.Context<IInputs>
	_popup:HTMLDivElement
	popupname:HTMLLabelElement
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._notifyOutputChanged=notifyOutputChanged
		this._context = context
		this.name = document.createElement('input');
		this.name.setAttribute('class','detailstext')

		const span = document.createElement('span')
		span.innerText="Name"
		span.appendChild(this.name)
		container.appendChild(span)
		this.btn = document.createElement("button")
		this.btn.innerText= "Show popup"
		container.appendChild(this.btn)

		
		this.name.addEventListener("keydown",this.updateparam)
		this.btn.addEventListener('click',this.showalert)

		const popup = document.createElement('div');
		popup.setAttribute('id','myDIV')

		const popupcontent = document.createElement('div');
		popupcontent.setAttribute('class','popupcontent')
		popupcontent.innerText = "Dynamic Popup ..."
		popupcontent.appendChild(document.createElement('br'))

		this.popupname = document.createElement("label")
		this.popupname.setAttribute('class', 'detailspopup')
		popupcontent.appendChild(this.popupname)
		popupcontent.appendChild(document.createElement('br'))

		this.btnclose = document.createElement('button')
		this.btnclose.innerText = "Close popup"
		this.btnclose.addEventListener('click',this.closealert)
		popupcontent.appendChild(this.btnclose)

		popup.appendChild(popupcontent)

		container.appendChild(popup)
		this._popup = popup
	}

	updateparam = ()=>{
		this._notifyOutputChanged();
	}

	showalert = ()=>{
		// alert(this._context.parameters.Name.raw)
		
		// if(this._popup.style.display==="none")
			this._popup.style.display ="block"
			this.popupname.innerText = this._context.parameters.Name.formatted?
			this._context.parameters.Name.formatted:""
		
	}
	closealert =()=>{
		this._popup.style.display ="none"
	}



	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this.name.innerText = context.parameters.Name.formatted?
		context.parameters.Name.formatted:""
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		console.log(this.name.value)
		return {
						
			Name:this.name.value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this.name.removeEventListener("keydown",this.updateparam)
		this.btn.removeEventListener('click',this.showalert)
		this.btnclose.removeEventListener('click',this.closealert)
	}
}
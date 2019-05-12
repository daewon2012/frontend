import React from 'react';
import {fabric} from 'fabric';
import ImageUploader from 'react-images-upload';
//import './App.css';

class FabricCanvas extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {pictures : []};
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        console.log(picture);
       /* this.setState({
            pictures: this.state.pictures.concat(picture),
        });
       
      let imageUrl = './img/tshirt1_back.jpg';
      var img = new Image();
      img.src = imageUrl;
      var Img = new fabric.Image(img);
      this.the_canvas.add(Img);
      this.the_canvas.renderAll();*/
     
    }
   
    componentDidMount(){

        this.the_canvas = new fabric.StaticCanvas('main-canvas', {
            preserveObjectStacking: true,
            height:375,
            width:375,
        });
    }

    componentWillReceiveProps = (newprops) =>{

        // If Updated Item is not the same as the old one
        //         => Update the canvas with newer item
        if(newprops.activeProperty !== this.props.activeProperty){
            this.updateCanvasforImage(this.props.activeProperty,newprops.activeProperty);
        }
    }

    updateCanvasforImage = (prev,next) => {

        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object;
                }
            } );

            this.the_canvas.remove(to_remove);

            if(next.the_type === 'bg'){
                this.the_canvas.setBackgroundImage(next);
                this.the_canvas.renderAll();                
                return;
            }

            this.the_canvas.add(next);
            this.the_canvas.moveTo(next, next.zIndex);
        }
    }

    saveToCanvas = () => {

        let link = document.createElement("a");
        link.href = this.the_canvas.toDataURL({format: 'png'});
          link.download = "design.png";
         link.click();

    }
    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        this.setState({selectedFile: file});
    }
   
    render(){
       
        return (
            <div className= "main-canvas-container">

                <canvas id= 'main-canvas'
                >
                </canvas>

               
                  <ImageUploader 
                    withIcon = {true}
                    buttonText = 'Choose images'
                    onChange = {this.onDrop}
                    imgExtension = {['.jpg', '.gif', 'png', '.gif']}
                    withPreview = {true}
                  />
            </div>
        );
    }
}

export default FabricCanvas;
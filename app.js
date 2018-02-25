 class App extends React.Component {

      constructor(props){
          super(props)
          this.state = {data: []};
          this.onSuccess = this.onSuccess.bind(this)
          console.log(this.state.data);
      }


      onSuccess(answer){
         console.log(answer);
         this.setState({data: answer});
      }
          

      componentDidMount(){
        $.ajax({
          'url': 'http://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=d4235d9ad3454af58c5afd2951fa7b03',
          'success':  this.onSuccess
        })
      }


      render(){
          let res = [];
         for(var doc of this.state.data.answer.response.docs.slice(1,5)){
           const comp = <Trt url={this.state.data}/>
        
        res.push(comp);
         return res;
        /* return <p>opa</p>*/
          }

      }




class Trt extends React.Component {

    constructor(props){
      super(props)
      this.state = {data: []};
      this.onSuccess = this.onSuccess.bind(this)
    }

    onSuccess(answer){
        console.log(answer);
        this.setState({data: answer});
    }   

    componentDidMount(){

        $.ajax({
          'url': 'http://api.linkpreview.net/?key=5a8c6f397e808b560f6b4a8e44ba5736d6ff6aa644f25&q=https://www.google.com',
          'success': this.onSuccess
        })

    }

    
      render(){

         return( <div><p>{this.state.data.description}</p>;
                     <img className="aa" src={this.state.data.image} ></img>
                     <p>MORE AT:<a href={this.state.data.url}>{this.state.data.url}</a></p>
               </div>
          );
        /* return <Trt url={this.state.web_url[0]}/> */

    }

}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);
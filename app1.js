class App extends React.Component {

      constructor(props){
        super(props)
        this.state = {data: []};
        this.onSuccess = this.onSuccess.bind(this);
        
      }


      onSuccess(answer){
        /*console.log(answer);*/
        const artic = answer.response.docs.slice(1,11);
        /*console.log(artic)*/
        this.setState({data: artic});
      }
          

      componentDidMount(){
        $.ajax({
          url: `http://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=d4235d9ad3454af58c5afd2951fa7b03`,
          success:  this.onSuccess
        })
      }

      render(){

         if(this.state.data.length ==0){
                   
                  
                    return  <img className="bb" src="./Demo1.gif" ></img>;
                }
        // console.log(article.web_url);
        return (
          <div>


          {
            this.state.data.map( (article) => <Article key={article.web_url} url={article.web_url} /> )
          }

          </div>
        );
      }

   }
     
    
  
class Article extends React.Component {

    constructor(props){
      super(props)
      this.state = {data: {}};
      this.onSuccess = this.onSuccess.bind(this)

    }

    onSuccess(answer){
         console.log(answer);
         this.setState({data: answer});   
    }   

    componentDidMount(){

        $.ajax({
          /*url: `http://api.linkpreview.net/?key=5a8c6f397e808b560f6b4a8e44ba5736d6ff6aa644f25&q=${this.props.url}`,*/
          url: 'http://api.linkpreview.net/?key=123456&q=https://www.google.com',
          success: this.onSuccess
        })

    }

    
    render(){
      console.log(this.state.data.url);
       console.log(this.state.data);
        

      return (
        <div className="flex-container">
          <p>{this.state.data.description}</p>
          <img className="aa" src={this.state.data.image} ></img>
          <p>MORE AT:
            <a id="link" href={this.state.data.url}>{this.state.data.url}</a>
          </p>
        </div>
      );
    }
}
function search() {
const root = document.getElementById('root');
ReactDOM.render(<App/>, root);
}





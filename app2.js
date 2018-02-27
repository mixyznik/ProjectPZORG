    class Page extends React.Component {
        
        constructor(props){
        super(props)
        this.state = {data: [],
                      selectedUser: {description: "opaopaopa"} };
                  

                     
        this.onSuccess = this.onSuccess.bind(this);
         this.handleTableRowClick = this.handleTableRowClick.bind(this);
        
      }

        handleTableRowClick(item){
              /*  debugger;*/
                console.log("Hello from handleTableRowClick!");
                 this.setState({selectedUser: item})
            }


      onSuccess(answer){
        /*console.log(answer);*/
        const artic = answer.response.docs.slice(1,11);
        /*console.log(artic)*/
        this.setState({data: artic});
      }
          

      componentDidMount(){
        $.ajax({
          url: `https://api.nytimes.com/svc/archive/v1/2017/1.json?api-key=d4235d9ad3454af58c5afd2951fa7b03`,
          success:  this.onSuccess
        })
      }



           render(){
           
                return (
                    <div className="page">
                        <div className="flex-container">

                             <App selectionHandler={this.handleTableRowClick} data={this.state.data} />
                        </div>
                       

                    </div>
                );
            }

        }



const UserDetails=(props)=>{
          const user = props.user;
          console.log(user);
          let headline = "";

          console.log(user.headline);
          if (user.headline) {
            headline = user.headline.main;
        }
            return (
            <div>  <p>Details about article: </p>
                    <ul>
                        <li>Headline: {headline}</li> 
                        <li>Source: {user.source}</li>
                        <li>Section name: {user.section_name}</li>
                        <li>Published: {user.pub_date}</li>
                        <li>Snippet: {user.snippet}</li>
                        <li>URL:<a href= {user.web_url}>{user.web_url}</a></li> 
                        
                                                
                       
                        
                    </ul>
            </div>
            );  

        };



class App extends React.Component {

     

      render(){

         if(this.props.data.length ==0){
                   
                  
                    return  (<img className="bb" id="working" src="./Demo1.gif" ></img>)
                }
       
        return (
          <div>


          {
            this.props.data.map( (article) => <Article item={article} key={article.web_url} url={article.web_url} clickHandler={this.props.selectionHandler}/> )
          }

          </div>
        );
      }

   }
     
    
  
class Article extends React.Component {

    constructor(props){
      super(props)
      this.state = {data: {}, style: {display:'none'}, h2: {height:''},
                     h2: {height:''}, 
                              details:{det:'Click for details!'},
                              color:{backgroundColor: '#eee', color: 'blue'}};
                    
      this.onSuccess = this.onSuccess.bind(this)

    }

    onSuccess(answer){
        /* console.log(answer);*/
         this.setState({data: answer});   
    }   
    
      handleClick(){
               /*let msg = "User details:\n";
                msg += " -" + this.state.data.description + ",\n";
              
                alert(msg);*/
                
                  this.props.clickHandler(this.props.item);
            }

   

  buttonClick() {
   
    if (this.state.style.display === "none" ) {
            this.state.style.display = " ";
       
            this.state.h2.height='auto';
             this.state.details.det='***Hide details!***';
            this.state.color.backgroundColor='#ca4646';
            this.state.color.color='white';

        }       

  else {
            this.state.style.display = "none";
         
              this.state.h2.height='';
              this.state.details.det='Click for details!';
              this.state.color.backgroundColor='#eee';
              this.state.color.color='blue';

        }

 

}




    componentDidMount(){

        $.ajax({
          /*url: `https://api.linkpreview.net/?key=5a8c6f397e808b560f6b4a8e44ba5736d6ff6aa644f25&q=${this.props.url}`,*/
          url: 'https://api.linkpreview.net/?key=123456&q=https://www.google.com',
          success: this.onSuccess
        })

    }

    
    render(){

   


     /* console.log(this.state.data.url);
       console.log(this.state.data);*/
         const user = this.props.item;
        /* console.log(user);*/
        const clickHandler = this.props.clickHandler;
      return (  
        <div className="flexi" style= {{height:this.state.h2.height}} onClick={() => clickHandler(user)}>
             <div id="wrap">
              <div id="wraptext">
          <h3 >{this.state.data.title}</h3><br/>
          <p >{this.state.data.description}</p><br/>
              </div>
          <img  className="aa" id="imm" src={this.state.data.image} ></img>
        <button className="collapsible"onClick={this.buttonClick.bind(this)} style={{backgroundColor: this.state.color.backgroundColor, color: this.state.color.color}}>{this.state.details.det}</button><br/>
             </div>
        <div className="content" style={{display:this.state.style.display}} >
        <div>
              <ul >
                       
                        <li>Source: {user.source}</li>
                        <li>Section name: {user.section_name}</li>
                        <li>Published: {user.pub_date}</li>
                        <li>Snippet: {user.snippet}</li>
                        <li>URL:<a target="_blank" href= {user.web_url}>{user.web_url}</a></li> 
                        
                                                
                       
                        
                    </ul>
        </div>
        </div>
        </div>

      );
    }
}
function search() {
const root = document.getElementById('root');
ReactDOM.render(<Page/>, root);
}





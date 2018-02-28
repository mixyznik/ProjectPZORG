    class Page extends React.Component {
        
        constructor(props){
        super(props)
        this.state = {data: [],
                      selectedUser: {description: "opaopaopa"} };
                  

                     
        this.onSuccess = this.onSuccess.bind(this);
         this.handleTableRowClick = this.handleTableRowClick.bind(this);
         this.refresh = this.refresh.bind(this);
        
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
        console.log('PAGE: componentDidMount')
        this.refresh();
      }

      refresh(){

        console.log('PAGE: refresh')

        $.ajax({
          url: 'https://api.nytimes.com/svc/archive/v1/'+$('#msg').val()+'/'+$('#msg1').val()+'.json?api-key=d4235d9ad3454af58c5afd2951fa7b03',
          success:  this.onSuccess
        })
      }





           render(){
           
              console.log('PAGE: render')

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
                   
                  
                    return  (<img className="bb" id="working" src="./demo1.gif" ></img>)
                }
         let counter=0;
        return (
          <div>


          {
            this.props.data.map( (article) =>(counter=counter+1,  <Article item={article} str={counter} key={article.web_url} url={article.web_url} clickHandler={this.props.selectionHandler}/>) )
          }

          </div>
        );
      }

   }
     
    
  
class Article extends React.Component {

    constructor(props){
      super(props)
      this.state = {data: {}, style: {display:'none'}, minH: {minHeight:''},
                              h2: {height:''}, 
                              details:{det:'Click for details!'},
                              color:{backgroundColor: '#eee', color: 'blue'},
                              divWrap:{backgroundColor: ''}};
                    
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
            this.state.minH.minHeight='300px';
            this.state.h2.height='auto';
             this.state.details.det='***Click to hide details!***';
            this.state.color.backgroundColor='#ca4646';
            this.state.color.color='white';
            this.state.divWrap.backgroundColor="#c80e2d";

        }       

  else {
            this.state.style.display = "none";
         
              this.state.h2.height='';
              this.state.details.det='Click for details!';
              this.state.color.backgroundColor='#eee';
              this.state.color.color='blue';
              this.state.divWrap.backgroundColor='';
        }

 

}


 



    componentDidMount(){

        $.ajax({
         /* url: `https://api.linkpreview.net/?key=5a8c6f397e808b560f6b4a8e44ba5736d6ff6aa644f25&q=${this.props.url}`,*/
          url: 'https://api.linkpreview.net/?key=123456&q=https://www.google.com',
          success: this.onSuccess
        })

    }

    
    render(){

   


     /* console.log(this.state.data.url);
       console.log(this.state.data);*/
         const user = this.props.item;
        console.log(user);
        console.log(this.props.str);
        const clickHandler = this.props.clickHandler;
      return (  
        <div className="flexi"  onClick={() => clickHandler(user)}>
             <div id="wrap" onClick={this.buttonClick.bind(this)}  style={{backgroundColor: this.state.divWrap.backgroundColor}}>
              <div id="wraptext">
          <p>Article number: {this.props.str}</p><br/>   
          <h3 >{this.state.data.title}</h3><br/>
          <p >{this.state.data.description}</p><br/>
              </div>
          <img  className="aa" id="imm" src={this.state.data.image} ></img>
        <button className="collapsible"  style={{backgroundColor: this.state.color.backgroundColor, color: this.state.color.color}}>{this.state.details.det}</button><br/>
             </div>
        <div className="content" style={{display:this.state.style.display, minHeight: this.state.minH.minHeight, height:this.state.h2.height}} >
        <div>
              <ul id="ull" >
                       
                        <li>Source: {user.source}</li>
                        <li>Section name: {user.section_name}</li>
                        <li>Desk: {user.news_desk}</li>
                        <li>Document: {user.document_type}</li>
                        <li>Type: {user.type_of_material}</li>
                        <li>Words: {user.word_count}</li>
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

var page;

/*console.log(a);*/

function search() {
var a=document.getElementById('msg').value;
let b=document.getElementById('msg1').value;
  if(a==="" || b==="") {
    alert("put year and month in fields");
 
  }
  else {

  console.log('SEARCH')

  const root = document.getElementById('root');
  page = ReactDOM.render(<Page/>, root); 
   page.setState({data: []})
/*ReactDOM.unmountComponentAtNode(document.getElementById('root'));*/
  if(page){
    page.refresh();
  } else {
    page = ReactDOM.render(<Page/>, root); 

  }
  }
}


  /*Main component*/
class Page extends React.Component {
        
        constructor(props){
        super(props)
        this.state = {data: [],
                      selectedUser: {description: "opaopaopa"} };
                                    
        this.onSuccess = this.onSuccess.bind(this);
        this.rawClick = this.rawClick.bind(this);
        this.refresh = this.refresh.bind(this);
        
      }

    rawClick(item){
        console.log("Hello from rawClick!");
        this.setState({selectedUser: item})
      }


    onSuccess(answer){
        /*console.log(answer);*/
        const artic = answer.response.docs.slice(1,21);
        /*console.log(artic)*/
        this.setState({data: artic});
      }

    componentDidMount(){
        console.log('PAGE: componentDidMount')
        this.refresh();
      }
          /*AJAX request to NY Times RESTful API*/
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
                         <Articles selectionHandler={this.rawClick} data={this.state.data} />
                    </div>
                </div>);
            }

        }

/* Class which extends on main Page class */
class Articles extends React.Component {
     

      constructor(props){
        super(props)
        this.state = {
          'selectedArticle': null
        }
        this.onArticleSelected = this.onArticleSelected.bind(this)
      }

      onArticleSelected(selectedArticle){

        if (this.state.selectedArticle) {
          const idOfOldSelected = this.state.selectedArticle._id;
          const idOfNewSelected = selectedArticle._id;
          if(idOfOldSelected === idOfNewSelected) {
            this.setState({'selectedArticle': null})
          } else {
             this.setState({'selectedArticle': selectedArticle})
          }
        } else {
          this.setState({'selectedArticle': selectedArticle})
        }

      }

      render(){

         /*If there is still no data, this ensures the "on progress" logo to be shown */
        if(this.props.data.length ==0){
          return  (<img className="bb" id="working" src="./progress.gif" ></img>)
        }
        let counter = 0;
        return (
           <div>
                {
                  this.props.data.map( 
                    (article) => (
                      counter = counter + 1,  
                      <Article 
                        item={article} 
                        str={counter} 
                        key={article.web_url} 
                        url={article.web_url} 
                        isSelected={this.state.selectedArticle ? article._id === this.state.selectedArticle._id : false}
                        clickHandler={this.onArticleSelected}/>
                      ) 
                    )
                }
           </div>
        );
    }

}
     
    
/*Defines article preview component, which is part of App.*/
class Article extends React.Component {

    constructor(props){
      super(props)           
      this.state = {data: {}};                
      this.onSuccess = this.onSuccess.bind(this)
    }

    onSuccess(answer){
      this.setState({data: answer});   
    }   
    
    handleClick(){
      this.props.clickHandler(this.props.item);
    }

    /*AJAX request to LinkPreview RESTful API*/
    componentDidMount(){
        $.ajax({
          url: `https://api.linkpreview.net/?key=5a8c6f397e808b560f6b4a8e44ba5736d6ff6aa644f25&q=${this.props.url}`,
         /* url: 'https://api.linkpreview.net/?key=123456&q=https://www.google.com',*/
          success: this.onSuccess
        })
    }

    /*
      Renders articles from search with title, description and image,
      and onClick shows hidden div with details from NY Times API
    */
    render(){

      // get variables from props
      const article = this.props.item;
      const clickHandler = this.props.clickHandler;

      // Define display values based on iformation is the article selected or not 
      const display =  this.props.isSelected ? '' : 'none';
      const minHeight = this.props.isSelected ? '300px' : '';
      const height = this.props.isSelected ? 'auto' : '';
      const btnTitle =  this.props.isSelected ? 'Hide details!' : 'Show details!';
      const backgroundColor= this.props.isSelected ?  '#ca4646' : '';
      const color = this.props.isSelected ? 'white' : 'black';
      const divWrapBackgroundColor =  this.props.isSelected ?  "#ebc4a3" : '';

      return (  
           <div className="flexi"  onClick={() => clickHandler(article)}>
             <div id="wrap"  style={{backgroundColor: divWrapBackgroundColor}}>
               <div id="wraptext">
                 <p>Article number: {this.props.str}</p><br/>   
                 <h3>{this.state.data.title}</h3><br/>
                 <p>{this.state.data.description}</p><br/>
               </div>
                 <img  className="aa" id="imm" src={this.state.data.image} ></img>
                 <button className="collapsible"  style={{backgroundColor: backgroundColor, color: color}}>{btnTitle}</button><br/>
             </div>
                 <div className="content" style={{display: display, minHeight: minHeight, height: height}} >
                 <div>
                     <ul id="ull" >
                        <li>Source: {article.source}</li>
                        <li>Section name: {article.section_name}</li>
                        <li>Desk: {article.news_desk}</li>
                        <li>Document: {article.document_type}</li>
                        <li>Type: {article.type_of_material}</li>
                        <li>Words: {article.word_count}</li>
                        <li>Published: {article.pub_date}</li>
                        <li>Snippet: {article.snippet}</li>
                        <li>URL:<a target="_blank" href= {article.web_url}>{article.web_url}</a></li> 
                     </ul>
                 </div>
                 </div>
           </div>
      );
    }
}


/*This part of code below enables that year and month inputs will be filled only with corect vaules*/
/*Also it enables Search button to work normally*/
/*It enabless to show progress after every search*/

var page;

function search() {
let a=document.getElementById('msg').value;
let b=document.getElementById('msg1').value;
  if(a==="" || b==="") {
    alert("Put correct year and month in input fields!");
 
  }
  else if(a.length==3 || a.length==2 || a.length==1) {
    console.log(a);
    alert('Put correct values in input fields!');
    a="";
  }
  else {

  console.log('SEARCH')

  const root = document.getElementById('root');
  page = ReactDOM.render(<Page/>, root); 
  page.setState({data: []})

  if(page){
    page.refresh();
  } else {
    page = ReactDOM.render(<Page/>, root); 

  }
  }
}


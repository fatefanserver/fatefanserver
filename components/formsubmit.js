import firebase from '../firebase/clientApp.js'
//const db = firebase.firestore();
import styles from '../styles/Home.module.css'
import styles2 from './servant/servant.module.css'
import { Formik, Form, useField, FieldArray } from 'formik';
import React, { Component } from 'react';
import * as Yup from 'yup';
import ImgInput from './imginput.js';
import CharacterPage from './characterpage.js';
import ColourPicker from './colorpicker.js';

const possibleClasses = ['Saber','Archer','Lancer','Assassin','Caster','Berserker','Foreigner','Ruler','Avenger','Pretender','Faker','Gunner','Watcher','Gatekeeper','Moon Cancer','Alter Ego','Voyager','Rider','Shielder'];
const exampleAttributes = ['Takeuchi','Nasu','10cm','100kg','Female','Antarctica','FGO','Late 1500s','Star','Lawful Evil']
const servantAttributes = ['artist','writer','height','weight','gender','region','source','timeperiod','attribute','alignment'];
const attributes = ['Artist','Writer','Height','Weight','Gender','Region','Source','Time Period','Attribute','Alignment'];

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <span className="error" style={{color:"red"}}>{meta.error}</span>
        ) : null}
      </>
    );
  };
const TextArea = ({label, ...props}) => {
  const [field,meta] = useField(props);
  return(
    <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <textarea className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <span className="error" style={{color:"red"}}>{meta.error}</span>
        ) : null}
    </>
  )
}
const MyImgInput = ({ label, id,...props }) => {
const [field, meta] = useField(props);
return (
    <ImgInput label={label} id={id} newprops={{...props}} field={field} meta={meta}/>
);
};
  
const MyCheckbox = ({ children, ...props }) => {
// React treats radios and checkbox inputs differently other input types, select, and textarea.
// Formik does this too! When you specify `type` to useField(), it will
// return the correct bag of props for you -- a `checked` prop will be included
// in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <span className="error" style={{color:"red"}}>{meta.error}</span>
            ) : null}
        </div>
    );
};
  
const MySelect = ({ label, ...props }) => {
const [field, meta] = useField(props);
return (
    <span>
    <br/>
    <label htmlFor={props.id || props.name}>{label}</label>
    <select {...field} {...props} />
    {meta.touched && meta.error ? (
        <span className="error" style={{color:"red"}}>{meta.error}</span>
    ) : null}
    </span>
);
};

const Expressions = ({index,formik}) => {
  //const [index,expression] = useField(props);
    return(
      <FieldArray name={`image.${index}.expression`}>
      {arrayExpression => (
        <>
        <button
          type="button"
          className="secondary"
          onClick={() => arrayExpression.push({ expressionName: '', url: '' })}
          disabled={formik.values.image[index].expression.length >= 25 ? true : false}>
          + Expression
        </button>
        {formik.values.image[index].expression.length > 0 && formik.values.image[index].expression.map((expimg, expindex) => 
          <div key={index+'exp'+expindex}>
          <MyTextInput disabled={formik.isSubmitting}
            label="Name "
            name={`image[${index}].expression[${expindex}].expressionName`}
            type="text"
            placeholder="smiling"
          />
          <br/>
          <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            label="URL "
            name={`image[${index}].expression[${expindex}].url`}
            type="text"
            placeholder="https://fatefanserver.com/your/image" 
        />
        <button
      type="button"
      className="secondary"
      onClick={() => arrayExpression.remove(expindex)}
      style={{marginLeft:"30px"}}>
      X
      
    </button>
          </div>
        )}
        </>
      )}
    </FieldArray>)
}

const VoiceParts = ({index,eindex,formik,stype}) => {
  //type = expressionsheet or voicelines
  //`elements[${index}][${eindex}][${stype}][${vindex}]`
  var curPush = {text: '', title: ''};
  switch(stype){
    case 'voicelines':
      curPush = {text: '',title: ''};
      break;
    case 'expressionsheet':
      curPush = {name: '', url: ''}
      break;
    case 'img':
      curPush = {description: '', url: ''}
      break;
  }
    return(
      <FieldArray name={`elements.${index}.${eindex}.${stype}`}>
      {arrayExpression => (
        <>
        <button
          type="button"
          className="secondary"
          onClick={() => {arrayExpression.push(curPush); }}
          disabled={formik.values.elements[index].length >= 10 ? true : false}>
          +
        </button>
        <hr/>
        {formik.values.elements[index][eindex][stype].length > 0 && formik.values.elements[index][eindex][stype].map((expimg, vindex) => 
          <div key={vindex+stype+eindex}> {
          <div key={vindex+stype+eindex} className={styles.individualform}>
          <br/>
          {stype == 'voicelines' ? <>
          <MyTextInput disabled={formik.isSubmitting}
              className={styles.heighttext}
              label="Title (optional) "
              name={`elements[${index}][${eindex}][${stype}][${vindex}].title`}
              type="text"
              placeholder="Likes"
          /><br/>
            <TextArea disabled={formik.isSubmitting}
            style={{height:"100px",width:"100%"}}
              className={styles.heighttext}
              label="Line "
              name={`elements[${index}][${eindex}][${stype}][${vindex}].text`}
              type="text"
              placeholder="I like fighting people!" 
          />
          </> : stype == 'expressionsheet' ?
          <>
          <MyTextInput disabled={formik.isSubmitting}
              className={styles.heighttext}
              label="Name "
              name={`elements[${index}][${eindex}][${stype}][${vindex}].name`}
              type="text"
              placeholder="smiling"
          />
            <MyTextInput disabled={formik.isSubmitting}
              className={styles.heighttext}
              label="URL "
              name={`elements[${index}][${eindex}][${stype}][${vindex}].url`}
              type="text"
              placeholder="https://www.image/producer/smiling" 
          />
          </> : 
          <>
          <MyTextInput disabled={formik.isSubmitting}
              className={styles.heighttext}
              label="URL "
              name={`elements[${index}][${eindex}][${stype}][${vindex}].url`}
              type="text"
              placeholder="https://www.fatefanserver.com/my_img"
          />
            <TextArea disabled={formik.isSubmitting}
              className={styles.heighttext}
              style={{width:"100%"}}
              label="Description "
              name={`elements[${index}][${eindex}][${stype}][${vindex}].description`}
              type="text"
              placeholder="A very interesting image." 
          />
          </>
          
          }
          <button
            type="button"
            className="secondary"
            onClick={() => arrayExpression.remove(vindex)}
            style={{marginRight:"30px"}}>
            X
          </button>
          </div> }</div>
        )}
        </>
      )}
    </FieldArray>)
}

const ElementText = ({index,eindex,formik,type}) => {
  switch(type){
    case 'text':
      return(<><br/>
    <TextArea disabled={formik.isSubmitting}
      style={{height:"100px",width:"100%"}}
        className={styles.heighttext}
        label="Text "
        name={`elements[${index}][${eindex}].text`}
        type="text"
        placeholder="You can use Markdown for images here!" 
    /></>
  )
     case 'voice':
      formik.values.elements[index][eindex].title ? null : formik.values.elements[index][eindex].title = '';
       return(
         <><br/>
         <MyTextInput disabled={formik.isSubmitting}
          className={styles.heighttext}
          label="Title (optional) "
          name={`elements[${index}][${eindex}].title`}
          type="text"
          placeholder="Likes"
      /><br/>
        <TextArea disabled={formik.isSubmitting}
        style={{height:"100px",width:"100%"}}
          className={styles.heighttext}
          label="Line "
          name={`elements[${index}][${eindex}].text`}
          type="text"
          placeholder="I like fighting people!" 
      />
      </>
       )
    case 'voiceBox':
      formik.values.elements[index][eindex].voicelines ? null : formik.values.elements[index][eindex].voicelines = [{text:'',title:''}];
      formik.values.elements[index][eindex].expressionsheet ? null : formik.values.elements[index][eindex].expressionsheet = [{name:'base',url:''}];
      return(
        <>
        <br/><br/>
        <span>Voice Lines</span>
        <VoiceParts stype="voicelines" index={index} eindex={eindex} formik={formik}/>
        <br/><br/>
        <span>Expression Sheet</span>
        <VoiceParts stype="expressionsheet" index={index} eindex={eindex} formik={formik}/>
        </>
      )
    case 'gallery':
      formik.values.elements[index][eindex].img ? null : formik.values.elements[index][eindex].img = [{description:'',url:''}];
      return (
        <>
        <br/><br/>
        <span>Images</span>
        <VoiceParts stype="img" index={index} eindex={eindex} formik={formik}/>
        </>

      )
    case 'np':
      ['classification','name','range','rank','targets'].forEach((ele) => {
        formik.values.elements[index][eindex][ele] ? null : formik.values.elements[index][eindex][ele] = '';
      })
      return(
        <>
        <br/>
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"100%"}}
            label="Name "
            name={`elements[${index}][${eindex}].name`}
            type="text"
            placeholder="[Imaginary Record]{#fg Absolute Stage of Fabricated Conception}" 
        />
        <br/>
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"50px"}}
            label="Range "
            name={`elements[${index}][${eindex}].range`}
            type="text"
            placeholder="50" 
        />
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"50px"}}
            label="NP Description "
            name={`elements[${index}][${eindex}].classification`}
            type="text"
            placeholder="Anti-Unit" 
        />
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"50px"}}
            label="Rank "
            name={`elements[${index}][${eindex}].rank`}
            type="text"
            placeholder="A+" 
        />
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"50px"}}
            label="Max. Targets "
            name={`elements[${index}][${eindex}].targets`}
            type="text"
            placeholder="10" 
        />
        <br/>
        <TextArea disabled={formik.isSubmitting}
          style={{height:"100px",width:"100%"}}
            className={styles.heighttext}
            label="NP Description "
            name={`elements[${index}][${eindex}].text`}
            type="text"
            placeholder="You can use Markdown for images here!" 
        />
        </>
      )
    case 'skill':
      ['icon','rank','name'].forEach((ele) => {
        formik.values.elements[index][eindex][ele] ? null : formik.values.elements[index][eindex][ele] = '';
      })
    default:
      return(<><br/>
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"100%"}}
            label="Icon (URL) "
            name={`elements[${index}][${eindex}].icon`}
            type="text"
            placeholder="https://fatefanserver.com/icon" 
        />
        <br/>
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"100%"}}
            label="Name "
            name={`elements[${index}][${eindex}].name`}
            type="text"
            placeholder="Charisma" 
        />
        <br/>
        <MyTextInput disabled={formik.isSubmitting}
            className={styles.heighttext}
            style={{width:"50px"}}
            label="Rank "
            name={`elements[${index}][${eindex}].rank`}
            type="text"
            placeholder="C" 
        />
        <br/>
        <TextArea disabled={formik.isSubmitting}
          style={{height:"100px",width:"100%"}}
            className={styles.heighttext}
            label="Skill Description "
            name={`elements[${index}][${eindex}].text`}
            type="text"
            placeholder="You can use Markdown for images here!" 
        />
      </>)
  }
  
}

const ElementParts = ({index,formik}) => {
  //const [index,expression] = useField(props);
    return(
      <FieldArray name={`elements.${index}`}>
      {arrayExpression => (
        <>
        <hr/>
        {formik.values.elements[index].length > 0 && formik.values.elements[index].map((expimg, eindex) => 
          <div key={expimg+'ee'+eindex}> {formik.values.elements[index][eindex].type != 'setting' ?
          <div key={index+'e'+eindex} className={styles.individualform}>
          <MySelect disabled={formik.isSubmitting}
              label="Subsection Type "
              name={`elements[${index}][${eindex}].type`}
              type="text"
              placeholder="Text"
            >
          <option value="text">Text</option>
          <option value="voice">Voice Line</option>
          <option value="voiceBox">Voice Line Box (VN)</option>
          <option value="np">NP</option>
          <option value="skill">Skill</option>
          <option value="gallery">Image Gallery</option>
        </MySelect>
        {<ElementText formik={formik} index={index} eindex={eindex} type={formik.values.elements[index][eindex].type}/>}
          <button
            type="button"
            className="secondary"
            onClick={() => arrayExpression.remove(eindex)}
            style={{marginRight:"30px"}}>
            X
            
          </button>
          </div> : 
          null}</div>
        )}
        <button
          type="button"
          className="secondary"
          onClick={() => {arrayExpression.push({ type: 'text'}); }}
          disabled={formik.values.elements[index].length >= 10 ? true : false}>
          + Subsection
        </button>
        </>
      )}
    </FieldArray>)
}
/*
<MySelect label="Job Type" name="jobType" disabled={formik.isSubmitting}>
                        <option value="">Select a job type</option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                    </MySelect>
*/
/*
function randomColor(){
  //const colors = ['#fff6f7','#aaf6f7','#faf6ff','#faa6f0','#aff6a0','#afe6e0','#6fffa1']
  //return(colors[Math.floor(Math.random() * colors.length)])
  const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
  const hex2 = ['a','b','c','d','e','f']
  return("#"+hex2[Math.floor(Math.random() * hex2.length)]+hex[Math.floor(Math.random() * hex.length)]+
  hex2[Math.floor(Math.random() * hex2.length)]+hex[Math.floor(Math.random() * hex.length)]+
  hex2[Math.floor(Math.random() * hex2.length)]+hex[Math.floor(Math.random() * hex.length)])
}
const randomColours = [randomColor(),randomColor(),randomColor()];*/

class FormSubmit extends Component{
  state = {
    isPreview: false,
    submitValues: {},
    hasEl: false,
    curSection: ['text']
  }
  
    render(){
      const defaultSchema = Yup.string().max(64,'Must be 64 characters or less');
      
        return(
          <>
            <Formik
          initialValues={{
            accessToken: '',
            acceptedTerms: true, 
            name: '',
            truename: '',
            class: '',
            artist:'',writer:'',aka:'',height:'',weight:'',gender:'',region:'',source:'',timeperiod:'',alignment:'',attribute:'',
            stats: {AGI: '', END: '', LUK: '', MP:'',NP:'',STR:''},
            basicDescription: '',
            bgColour: '#91a1a1',
            sColour: '#cadada',
            bckColour: '#f5f5f5',
            aka: [
              ''
            ],
            image: [
              {description: '',
               url: '',
               name:'',
               expression: [
                 
               ]}
            ],
            elements: [
              [{type:'setting',
              title:'My First Section'}]
              ],
          }}
          validationSchema={Yup.object({
            acceptedTerms: Yup.boolean(),
            name: Yup.string()
              .notOneOf([this.props.wikidata],
                'That name is taken.'
              )
              .matches(/^[a-zA-Z-_0-9]+$/,{excludeEmptyString:true,message:'You can only use letters, numbers, dashes, and underscores.'})
              .required('Required')
              .max(50, 'Must be 50 characters or less')
              .min(2, 'Must be 2 characters or more'),
            truename: Yup.string()
              .max(50,'Must be 50 characters or less')
              .required('Required'),
            class: Yup.string()
              .min(3,'Must be 3 characters or more')
              .max(32,'Must be 32 characters or less')
              .required('Required'),
            classIcon: Yup.string()
                .oneOf(possibleClasses),
            artist:defaultSchema,writer:defaultSchema,aka:Yup.string().max(128,'Must be 128 characters or less'),
            height: Yup.string().max(32,'Must be 32 characters or less'),
            weight:Yup.string().max(32,'Must be 32 characters or less'),
            gender:defaultSchema,region:defaultSchema,source:defaultSchema,timeperiod:defaultSchema,
            stats: Yup.object({
              AGI: defaultSchema,
              END: defaultSchema,
              LUK: defaultSchema,
              MP: defaultSchema,
              NP: defaultSchema,
              STR: defaultSchema,
            }),
            aka: Yup.array()
                .of(defaultSchema)
                .max(10,'Cannot have more than 10'),
            sColour: defaultSchema,
            bgColour: defaultSchema,
            bckColour: defaultSchema,
            basicDescription: Yup.string()
              .max(2000,'Must be 2000 characters or less'),
            image: Yup.array()
              .of(Yup.object({
                description: Yup.string()
                  .max(512,'Must be 512 characters or less'),
                url: Yup.string()
                  .url('Must be a valid URL')
                  .required('Required'),
                name: Yup.string()
                  .max(64,'Must be 64 characters or less')
                  .min(2,'Must be 2 characters or more')
                  .required('Required'),
                expression: Yup.array()
                  .of(Yup.object({
                    expressionName: Yup.string()
                    .matches(/^[a-zA-Z-_0-9]+$/,{excludeEmptyString:true,message:'You can only use letters, numbers, dashes, and underscores.'})
                    .max(20,'Cannot be longer than 20 characters')
                    .min(1,'Must be 1 character or more'),
                   url: Yup.string()
                   .url('Must be a valid URL')
                  }))
              })),
            url: Yup.string()
              .url('Must be a valid URL'),
            
            
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
            {(formik) => (
                <Form style={{display:"flex"}}>    
                <div style={{width:"45vw", height:"85vh",overflow:"auto"}}>
                <button disabled={formik.isSubmitting} type="reset">Clear All</button><br/>
                    <MyTextInput disabled={formik.isSubmitting}
                        label="Access Token "
                        name="accesstoken"
                        type="text"
                        placeholder="paste here"
                    />                
                    <p/>
                    <MyCheckbox name="acceptedTerms" disabled={formik.isSubmitting}>
                    Make public
                    <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"This allows your page to appear on the All Servants page. You also get a custom URL based on the name.\nIf this is not checked, the URL will be random. You will still be able to share it with others."}</span></span>
                    
                    <br/>
                    </MyCheckbox>
                    <p/>
                    <MyTextInput disabled={formik.isSubmitting}
                        label="Name "
                        name="name"
                        type="text"
                        placeholder="producer"
                    />
                    <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"The name is the *only part* you are not allowed to edit later.\n It will *only* be used for the URL of your page (if set to public) and all references to the name will be done with whatever you filled in the True Name field, so prioritize something memorable and unique.\nFor example, you could use `nobunaga` instead of `oda_nobunaga`."}</span></span>
                    <br/>
                    <MyTextInput disabled={formik.isSubmitting}
                        label="True Name "
                        name="truename"
                        type="text"
                        placeholder="Imaginary Record"
                    />
                    <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"This will be the name used for most purposes"}</span></span>
                      <br/>
                    <MyTextInput disabled={formik.isSubmitting}
                        label="Class "
                        name="class"
                        type="text"
                        placeholder="Caster"
                    />
                    <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"You can use non-canon classes, but that may prevent your Servant from appearing in site searches."}</span></span>
                    <br/>
                    <MyTextInput disabled={formik.isSubmitting}
                    style={{backgroundColor:formik.values.bgColour, width: "100px"}}
                        label="Main Colour "
                        name="bgColour"
                        type="text"
                        placeholder="#ffffff"
                    />
                    <MyTextInput disabled={formik.isSubmitting}
                    style={{backgroundColor:formik.values.sColour, width: "100px"}}
                        label="Accent Colour "
                        name="sColour"
                        type="text"
                        placeholder="#000000"
                    />
                    <MyTextInput disabled={formik.isSubmitting}
                    style={{backgroundColor:formik.values.bckColour, width: "100px"}}
                        label="Background Colour "
                        name="bckColour"
                        type="text"
                        placeholder="#a5fffe"
                    />
                    <br/>
                    <ColourPicker/>
                    <p/>
                    <h3>Optional Attributes
                    <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"These are all optional (you can always edit them in later)"}</span></span>
                    </h3>
                    
                    <div className={styles.individualform}>
                    <div style={{fontSize:"10px"}}>It is recommended that you do height and weight in metric for the site searching functions.</div>
                      {servantAttributes.map((v,i) => {
                        return(<div key={v+'optional'}><MyTextInput
                                  label={attributes[i]+' '}
                                  name={v}
                                  
                                  type="text"
                                  placeholder={exampleAttributes[i]}
                                />{i % 2 == 1 ? <br/> : <span/>}</div>)
                        
                      })}
                      <br/>
                      <b key={"statoption"}>Stats</b>
                      <div className={styles.individualform}>
                        <MyTextInput disabled={formik.isSubmitting}
                            label="STR "
                            name={`stats.STR`}
                            type="text"
                            placeholder="A"
                        />
                        <MyTextInput disabled={formik.isSubmitting}
                            label="END "
                            name={`stats.END`}
                            type="text"
                            placeholder="B"
                        />
                        <br/>
                        <MyTextInput disabled={formik.isSubmitting}
                            label="AGI "
                            name={`stats.AGI`}
                            type="text"
                            placeholder="C"
                        />
                        <MyTextInput disabled={formik.isSubmitting}
                            label="MP "
                            name={`stats.MP`}
                            type="text"
                            placeholder="D"
                        />
                        <br/>
                        <MyTextInput disabled={formik.isSubmitting}
                            label="LUK "
                            name={`stats.LUK`}
                            type="text"
                            placeholder="E"
                        />
                        <MyTextInput disabled={formik.isSubmitting}
                            label="NP "
                            name={`stats.NP`}
                            type="text"
                            placeholder="EX"
                        />
                        </div>
                        <br/>
                        <FieldArray name="aka">
                        {arrayHelpersAka =>(
                          <>
                          <b>AKA </b>
                          <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px",marginRight:'20px'}}>
                          <span className={styles2.tooltiptext}>{"These are also used for searching."}</span></span>
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => arrayHelpersAka.push('')}
                            disabled={formik.values.aka.length >= 10 ? true : false}>
                            +
                          </button>
                          <div className={styles.individualform}>
                          {formik.values.aka.length > 0 && formik.values.aka.map((akai, index) => 
                          <div  key={index+'aka'}>
                          <MyTextInput disabled={formik.isSubmitting}
                            label=" "
                            name={`aka[${index}]`}
                            type="text"
                            placeholder="Penelope"
                        />
                          <button
                              type="button"
                              className="secondary"
                              onClick={() => arrayHelpersAka.remove(index)}
                              style={{marginRight:"20px"}}>
                              X
                              
                            </button>
                          </div>)}
                            
                          </div>
                          </>
                          )}
                        </FieldArray>
                        <br/>
                        <div><b>Basic Description</b></div>
                        <TextArea disabled={formik.isSubmitting}
                          className={styles.heighttext}
                          style={{height:"100px",width:"100%"}}
                          label=""
                          name={`basicDescription`}
                          type="text"
                          placeholder="A basic description of your Servant. You can also put Likes, Dislikes, Natural Enemies..." 
                      />
                    </div>
                    <p/>
                    <h3>Profile Images
                    <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"Use URLs for images. You can just drag it into Discord and copy that. Press the +s to add more images/expressions.\nThis section can also support expression sheets."}</span></span>
                    </h3>
                    <FieldArray name="image">
                    {arrayHelpersImg =>(
                      <>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => arrayHelpersImg.push({ description: '', url: '' ,name:'',expression:[]})}
                        disabled={formik.values.image.length >= 10 ? true : false}>
                        + Image
                      </button>
                      <div >
                      {formik.values.image.length > 0 && formik.values.image.map((img, index) => 
                      <div className={styles.individualform} key={index+'img'}>
                      <b>Image/Outfit/Ascension {index+1}</b><br/>
                        <MyTextInput disabled={formik.isSubmitting}
                            label="URL "
                            name={`image.${index}.url`}
                            type="text"
                            placeholder="https://fatefanserver.com/your/image"
                        />
                        <MyTextInput disabled={formik.isSubmitting}
                            label="Name "
                            name={`image.${index}.name`}
                            type="text"
                            placeholder="HGW Outfit"
                        />
                        <br/>
                        <TextArea disabled={formik.isSubmitting}
                          className={styles.heighttext}
                          style={{height:"50px",width:"100%"}}
                          label="Description "
                          name={`image.${index}.description`}
                          type="text"
                          placeholder="(Optional) An outfit based on a certain mascot." 
                      />
                      
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => arrayHelpersImg.remove(index)}
                          style={{float:"right"}}>
                          X Remove
                          
                        </button>
                        <br/>
                        <b>Expressions</b>
                        <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px"}}>
                      <span className={styles2.tooltiptext}>{"Make sure all the expressions are aligned. The easiest way to do this is just drawing them on top of the same file."}</span></span>
                        <Expressions formik={formik} index={index}/>
                      </div>)}
                        
                      </div>
                      </>
                      )}
                    </FieldArray>
                    <p/>
                    <FieldArray name="elements">
                        {arrayHelpersE =>(
                          <>
                          <b>Sections </b>
                          <span className={styles2.tp+" bi bi-question-circle-fill"} style={{marginLeft:"10px",marginRight:'20px'}}>
                          <span className={styles2.tooltiptext}>{"You can put anything you want here. For example, character details, image galleries..."}</span></span>
                          <br/>
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => {arrayHelpersE.push([{type:'setting',title:''}])}}
                            disabled={formik.values.elements.length >= 15 ? true : false}>
                            + Section
                          </button>
                          <div >
                          
                          {formik.values.elements.length > 0 && formik.values.elements.map((e, index) => 
                          <div className={styles.individualform} key={index+'elementholder'}>
                          <div  key={index+'el'}>
                          
                          <MyTextInput disabled={formik.isSubmitting}
                            label="Title "
                            name={`elements[${index}][${0}].title`}
                            type="text"
                            placeholder="Dialogue"
                          />
                          
                          <ElementParts formik={formik} index={index}/>
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => arrayHelpersE.remove(index)}
                              style={{float:"right"}}>
                              X Remove
                              
                            </button>
                          </div>
                          </div>
                          )}
                            
                          </div>
                          </>
                          )}
                        </FieldArray>
                    <p/>
                    <button disabled={formik.isSubmitting || !formik.isValid} type="submit">Submit</button>
                    </div>
                     <div style={{width:"50vw",fontSize:"10px",height:"85vh",overflow:"auto"}}>
                    <div className={styles.container} style={{
                        backgroundColor: formik.values.bckColour,
                      
                      }}>

                     
                        <h1>Preview</h1>
                          <CharacterPage wikidata={formik.values}/></div>
                          </div>
                                </Form>
                            
                            )}
        </Formik>
        
        </>
        )
    }
}
/**
 * <button disabled={formik.isSubmitting || !formik.isValid} 
                            type="button"
                            //onClick={() => this.updateValues(formik.values)}
                            onClick={() => null}
                            >Update Preview</button>
 */
export default FormSubmit;

/**

 
<FieldArray name="image">
                    {arrayHelpersImg =>(
                      <>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => arrayHelpersImg.push({ description: '', url: '' ,name:'',expression:[]})}>
                        +
                      </button>
                      <div >
                      {formik.values.image.length > 0 && formik.values.image.map((img, index) => 
                      <div className={styles.individualform} key={index+'img'}>
                      <button
                          type="button"
                          className="secondary"
                          onClick={() => arrayHelpersImg.remove(index)}
                          style={{float:"right"}}>
                          X Remove
                          
                        </button>
                      </div>)}
                        
                      </div>
                      </>
                      )}
                    </FieldArray>
*/
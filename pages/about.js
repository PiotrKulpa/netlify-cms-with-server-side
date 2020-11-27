import Layout from '../components/layout'
import { attributes, html } from '../content/about.md'
var Airtable = require('airtable');
let fetchedMenu = [];

const About = ({ test,  fetchedMenu = [] }) => (
  <Layout>
    <h1>{attributes.title}</h1>
    <h2>{ test }</h2>
    { fetchedMenu &&  fetchedMenu.map((el) => <p>{el.name}</p>)}
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <style jsx>{`
      h1,
      div {
        text-align: center;
      }
    `}</style>
  </Layout>
)

export async function getServerSideProps(context) {

  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;


  var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('apppv5xeZ1bAJdvLy');
 
  base('Menu').select({
    view: 'Grid view',
  }).firstPage((err, records) => {

    if (err) { console.error(err); return; }
    const menu = records.map((record) => {
      return {
        name: record.get('nameVisible'),
        url: record.get('menuUrl'),
        slug: record.get('slug'),
      }
    });
    fetchedMenu = menu;
    
  });

  return {
    props: {
      test: 'Testing server side rendering on netlify',
      fetchedMenu
    }, // will be passed to the page component as props
  }
}

export default About

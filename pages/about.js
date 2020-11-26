import Layout from '../components/layout'
import { attributes, html } from '../content/about.md'

const About = ({ test}) => (
  <Layout>
    <h1>{attributes.title}</h1>
    <h2>{ test }</h2>
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
  return {
    props: {
      test: 'Testing server side rendering on netlify'
    }, // will be passed to the page component as props
  }
}

export default About

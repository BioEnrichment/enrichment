
import LDFServer, { BOUND, UNBOUND, UNIMPLEMENTED } from 'ldf-facade'
import request from 'request-promise'
import getConfig from '@bioenrichment/config'
import { eriToURIs, urisToERI } from '@bioenrichment/xrefdb-client'
import bodyParser from 'body-parser'

let server = new LDFServer()

let ensemblBacteriaPrefix = 'http://proxy.enrichment.ncl.ac.uk/EnsemblBacteria/'

/* Add a custom getXRefs endpoint (part of enrichment but not part of the
 * default LDF server)
 */
server.app.post('/getXRefs', bodyParser.json(), async (req, res) => {

  res.send(JSON.stringify({ uris: [] }))
})

server.pattern({
  s: BOUND,
  p: UNBOUND,
  o: UNBOUND
}, async function(state, pattern) {

  	const config = getConfig()

    /* If we are not looking for an enrichment URI, nothing to do
     */
  	if(pattern.s.indexOf(config.eriPrefix) !== 0)
      return { total: 0 }

    /* Get the URIs that this enrichment URI represents (xrefs)
     * We are looking for an ensembl one.
     */
		const uris = await eriToURIs(pattern.s)

		if(uris.length === 0) {
			return { total: 0 }
		}

    console.log(JSON.stringify(uris))

    for(let uri of uris) {
      if(uri.indexOf(ensemblBacteriaPrefix) === 0) {
        let accession = uri.slice(ensemblBacteriaPrefix.length)

        let triples = await ensemblToTriples(pattern.s, accession)

        return { triples, total: triples.length, nextState: null }

      }
    }

    return { total: 0 }
})

async function ensemblToTriples(s, accession) {

  let triples = []

  triples.push({
    s, p: 'http://cello/accession', o: accession
  })

  return triples
}



server.listen(5555)

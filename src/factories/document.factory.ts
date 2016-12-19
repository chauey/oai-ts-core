import {OasDocument} from "../models/document.model";
import {Oas20Document} from "../models/2.0/document.model";
import {Oas20JS2ModelReader} from "../readers/js2model.reader";

/**
 * The main factory for creating new OAS Documents.  This can be used to create a new, empty
 * document.  It can also be used to parse
 */
export class OasDocumentFactory {

    /**
     * Creates a new, empty instance of an OAS document.
     * @param oasVersion
     * @return {OasDocument}
     */
    public createEmpty(oasVersion: string): OasDocument {
        if (oasVersion === "2.0") {
            return new Oas20Document();
        }

        throw new Error("Unsupported OAS version: " + oasVersion);
    }

    /**
     * Reads the given object and creates a valid OAS document model.
     * @param oasObject
     * @return {Oas20Document}
     */
    public createFromObject(oasObject: any): OasDocument {
        if (oasObject.swagger && oasObject.swagger === "2.0") {
            let reader: Oas20JS2ModelReader = new Oas20JS2ModelReader();
            return reader.read(oasObject);
        } else {
            throw new Error("Unsupported OAS version: " + oasObject.swagger);
        }
    }

    /**
     * Parses the given OAS definition source, parses it into an appropriate data model, and
     * returns it.  The factory will figure out what version of the data model to create based
     * on the content of the source.
     *
     * @param oasDefinitionSource
     * @return {null}
     */
    public createFromJson(oasDefinition: string): OasDocument {
        let jsObj: any = JSON.parse(oasDefinition);
        return this.createFromObject(jsObj);
    }

}
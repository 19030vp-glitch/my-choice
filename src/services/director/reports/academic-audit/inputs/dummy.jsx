import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { ContentState, Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML, parseHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import htmlToDraft from 'html-to-draftjs';


const RichText = ({ id, state, setState, note = false }) => {

    // the upcoming state should be like
    const auditYear = useSelector(state => state.academicAudit.auditYear)

    const [changed, setChanged] = useState(false)

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleEditorChange = (state) => {
        setEditorState(state);
    }

    const stateManager = (e) => {
        e.preventDefault()
        setState({
            editorHTML:
                document.getElementById(id).querySelector('.DraftEditor-editorContainer').innerHTML,
            pureHTML: convertToHTML(editorState.getCurrentContent()),
            editorState: convertFromHTML(editorState.getCurrentContent())
        })
        setChanged(false)
    }

    useEffect(() => {
        if (state.editorState) {
            // const sampleMarkup =
            //     '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
            //     '<a href="http://www.facebook.com">Example link</a>';

            // const blocksFromHTML = convertFromHTML(sampleMarkup);
            // const state = ContentState.createFromBlockArray(
            //     blocksFromHTML.contentBlocks,
            //     blocksFromHTML.entityMap,
            // );

            const blocksFromHtml = htmlToDraft('<p>Sajed</p>');
            const { contentBlocks, entityMap } = blocksFromHtml.contentBlocks;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);

            console.log('editorstate : ', editorState)



            setChanged(true)
        }
    }, [auditYear])


    return (
        <div className="Editor">
            {
                note && <div>
                    {note}
                </div>
            }
            <div id={id}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={(state) => { handleEditorChange(state); setChanged(true) }}
                    placeholder={`${state.editorHTML ? '' : 'Start typing here...'}`}
                />
            </div>

            {
                changed ? <div className='ml-2'>
                    <button onClick={stateManager} className='p-2 bg-blue-700 text-white rounded-full hover:bg-blue-600'>Save Writeup</button>
                </div> : <span className='bg-green-100 text-green-900 ml-2 py-1 px-4 rounded-xl'>Progress saved...</span>
            }

        </div>

    )

}

export default RichText
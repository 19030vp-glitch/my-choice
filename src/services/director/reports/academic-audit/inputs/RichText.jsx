import React, { useEffect, useRef } from 'react';

export default function RichText({ state, setState, note = false, allYearAAAData, fetchPreviousYears = false, tableToFetch = null }) {

    return (
        <div>
            <p className='my-4'>This module / tools is not available at the moment </p>
        </div>
    );
}


{/* <div className='flex flex-col gap-3'>

<div className='flex items-start justify-between w-full'>
    <div>
        {
            note && <div>
                {note}
            </div>
        }
    </div>
    <div className='w-[30%] float-right'>
        {
            (fetchPreviousYears && allYearAAAData) && <ShowAAAFetchButton allYearAAAData={allYearAAAData} setState={setState} state={state} tableToFetch={tableToFetch} />
        }
    </div>
</div>


<Editor
    tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
    onInit={(evt, editor) => editorRef.current = editor}
    initialValue={state.content}
    init={{
        height: 300,
        menubar: false,
        placeholder: "Start typing...",
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
        ],
        toolbar: 'bold italic underline bullist numlist lineheight paste table | styles fontfamily fontsize | forecolor backcolor |' +
            '| searchreplace spellchecker fullscreen | image link insertdatetime | undo redo',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
    onBlur={log}
/>
</div> */}
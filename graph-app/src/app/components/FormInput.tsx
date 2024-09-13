'use client'
import { useId } from 'react';
import { transformInput } from '../helpers/convertInput';
import { TSP } from '../algorithm/TSP';
import { InputType } from '../types/InputType';

export default function Form() {
    const inputAreaId = useId();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        const input: InputType = transformInput(formJson.data as string)

        const tsp = new TSP(input.n, input.start, input.arr);
        console.log('tsp:', tsp.solver());

    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={inputAreaId}>
                        Input:
                    </label>
                </div>
                <textarea
                    id={inputAreaId}
                    name="data"
                    rows={5}
                    cols={40}
                    autoFocus={true}
                />
                <hr />
                <div>
                    <button type="reset">Reset</button>
                    <button type="submit">Save</button>
                </div>
            </form>
            <div>
                <span>RES IS: { }</span>
            </div>
        </div>
    );
}
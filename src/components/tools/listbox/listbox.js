import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'



export default function ListBox(props) {
    const {items} = props

    const [item, setItem] = useState(items[0])

    return (
        <Listbox value={item} onChange={setItem} as="div" className="mb-10">
            <Listbox.Button as="button" className="focus:outline-none focus:ring-2 px-6 py-2 w-72 rounded-lg hover:bg-gray-200 transition font-medium bg-gray-100 flex items-center justify-between">
                <span>{item.name}</span>
                <SelectorIcon className="w-5 h-5"/>
            </Listbox.Button>
            <Listbox.Options as="div" className="mt-2 absolute z-10 shadow-xl transition rounded-lg py-2 bg-gray-100 cursor-pointer list-none w-72">
                {items.map((item) => (
                    <Listbox.Option
                        key={item.id}
                        value={item}
                    >
                        {({ active, selected }) => (
                            <li
                                className={`${
                                    selected ? 'font-medium pl-6' : 'pl-12'
                                }  py-1 pr-6 transition hover:bg-blue-200 flex items-center text-gray-800`}
                            >
                                {selected && <CheckIcon className="w-5 h-5 mr-1 text-blue-500"/>}
                                <span>{item.name}</span>
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}

import React, {createContext, useState, useContext, Dispatch, SetStateAction} from "react";

export interface SideBarStateInterface {
    collapsed: boolean;
}

const SideBarStateContext = createContext({
    state: {} as Partial<SideBarStateInterface>,
    setState: {} as Dispatch<SetStateAction<Partial<SideBarStateInterface>>>,
});

const SideBarStateProvider = ({
                                  children,
                                  value = {
                                        collapsed: true
                                  } as SideBarStateInterface,
                              }: {
    children: React.ReactNode;
    value?: Partial<SideBarStateInterface>;
}) => {
    const [state, setState] = useState(value);
    return (
        <SideBarStateContext.Provider value={{state, setState}}>
            {children}
        </SideBarStateContext.Provider>
    );
};

const useSideBarState = () => {
    const context = useContext(SideBarStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a SideBarStateContext");
    }
    return context;
};

export {SideBarStateProvider, useSideBarState};
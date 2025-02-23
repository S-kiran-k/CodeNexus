import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"
import { PiCaretDownBold } from "react-icons/pi"

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value))


    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex flex-col items-center gap-2 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Settings</h1>
            {/* Choose Font Family option */}
            <div className=" w-full ">
                <div className="w-full py-2">
                    <Select
                        onChange={handleFontFamilyChange}
                        value={fontFamily}
                        options={editorFonts}
                        title="Font Family"
                    />
                </div>
                <div className="relative w-full">
                    <p>Font Size</p>
                    <select
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        className="w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
                        title="Font Size"
                    >
                        {[...Array(13).keys()].map((size) => {
                            return (
                                <option key={size} value={size + 12}>
                                    {size + 12}
                                </option>
                            )
                        })}
                    </select>
                    <PiCaretDownBold
                        size={16}
                        className="text-whit absolute bottom-3 right-4 z-10"
                    />
                </div>

                {/* Choose font size option */}
            </div>
            {/* Choose theme option */}
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={Object.keys(editorThemes)}
                title="Theme"
            />
            {/* Choose language option */}
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={langNames}
                title="Language"
            />
            {/* Show GitHub corner option */}
            <button
                className="mt-auto w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
                onClick={resetSettings}
            >
                Reset to default
            </button>
        </div>
    )
}

export default SettingsView

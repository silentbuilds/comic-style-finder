(() => {
  'use strict';
  const STYLE_NAMES = `American Comic
Manga (Japanese)
European Bande Dessinée
Cartoon/Animated
Chibi
Webtoon
Watercolor
Sketch/Pencil
Pixel Art
Line Art
Infographic Comic
Noir/Graphic Novel
Comic Strip
Surreal/Experimental
3D/CGI Comic
Traditional Ink (Chinese)
Underground Comix
Mecha Anime
Gothic Romance Comic
Ukiyo-e Inspired Comic
Woodcut/Linocut Comic
Steampunk Adventure Comic
Newspaper Editorial Cartoon
Children’s Picture-Book Comic
Risograph Indie Zine Comic
Retro Newspaper Adventure Strip
Mixed-Media Scrapbook Comic
Claymation/Stop-Motion Comic
Psychedelic Pop-Art Comic
Mythic Epic Comic
Slice-of-Life Diary Comic
Sci-Fi Hardline Technical Comic
Gekiga Comic
Josei Romance Manga
Kodomo Manga
Korean Romance Manhwa
Wuxia Comic
Ligne Claire Detective Comic
Folk-Art Comic
Art Nouveau Fantasy Comic
Graffiti/Street Comic
Cut-Paper Collage Comic
Blueprint/Technical Story Comic
Gothic Horror Manga
Minimal Geometric Comic
Fantasy Map Comic
Stained-Glass Comic
Low-Poly 3D Comic
Silver Age Superhero Comic
Funny Animal Sunday Comic
Autobiographical Memoir Comic
Political Satire Comic
Sword-and-Sorcery Comic
Retro Sci-Fi Pulp Comic
Magical Girl Manga
Sports Manga
Post-Apocalyptic Comic
Silhouette Fairy-Tale Comic
Charcoal Expressionist Comic
Educational Science Comic
Solarpunk Comic
Kaiju Monster Comic
Notebook Doodle Comic
Isometric Adventure Comic
Franco-Belgian Humor Comic
Seinen Psychological Manga
Historical Manhua
Family Newspaper Gag Strip
Woodblock Fantasy Comic
1980s Airbrush Fantasy Comic
Silent Wordless Comic
Photo-Comic/Fumetti
Pastel Dream Comic
Art Deco Futurist Comic
Scratchboard Mystery Comic
Educational Adventure Comic
Dieselpunk Action Comic
Monoline Minimalist Comic
Medieval Tapestry Comic
Reaction Webcomic Style
Cubist Comic
Vaporwave Neon Comic
Byzantine Icon Comic
Swiss Design Infographic Comic
Shadow-Puppet Comic
Copper Engraving Comic
Quilt Folk Comic
Brutalist Webcomic
Ancient Fresco Comic
Cyanotype Adventure Comic
Dada Collage Comic
Constructivist Propaganda Comic
Mosaic Tile Comic
Asemic Experimental Comic
Chalkboard Lesson Comic
X-Ray / Medical Imaging Comic`.split('\n');

  // Subject-free traits and descriptors derived from the exact accepted sample prompts.
  // Row order follows STYLE_NAMES; provenance is art_manifest.json#<id>.
  // signature (3 traits) | palette | linework | texture | pacing
  const VISUAL_DETAILS = `Heroic foreshortening; diagonal high-stakes action; sharp impact shapes|Bold flat primary colors|Thick-and-thin black brush outlines|Controlled halftone shadows and rugged surface detail|Low-angle action followed by impact close-ups
Expressive eye insets; reaching-hand close-ups; directional speed lines|Black and white with large white spaces|Crisp variable pen strokes|Screentone dots and solid black hair masses|Main action punctuated by two tight inset beats
Detailed everyday architecture; deep navigable perspective; broad environment-led panels|Warm flat environmental colors|Clear carefully separated contours|Clean flat fills and observed environmental detail|Unhurried wide scenes with readable spatial transitions
Squash-and-stretch acting; curved silhouettes; clear lines of action|Bright animation color keys|Clean curved animation outlines|Simple cel-shaded fills|Anticipation followed by an exaggerated reaction
Two-head-tall proportions; tiny mitten hands; sparkling oversized eyes|Flat peach, orange and teal|Bold clean simplified contours|Flat fills with sparse delight marks|One instantly readable oversized emotional beat
Stacked borderless beats; variable panel heights; large anticipation gutters|Luminous contemporary digital colors|Polished expressive digital lines|Smooth digital fills and luminous highlights|Close-up, long white pause, reaching gesture, emotional reveal
Transparent overlapping washes; layered organic foreground depth; unpainted highlights|Granulating blue-green shadows with warm accents|Wet-into-wet edges and restrained dry brush|Cold-press paper tooth and transparent pigment|Lyrical close moments with atmospheric breathing room
Searching construction contours; observed hands; unfinished fading edges|Strict monochrome graphite on off-white|Pressure-varied pencil contours and crosshatching|Pencil tooth and visible erased marks|Intimate observation held in a quiet close view
Stepped sprite silhouettes; cohesive low-resolution world; hand-placed dithering|Restricted 16-color game palette|Crisp square pixel edges without smoothing|Deliberate pixel clusters and dither patterns|Platform-like spatial action with clear sprite-sized beats
Spacious contour composition; expressive hands; sparse hatching|Pure black ink on white|Restrained varied outline weight|Unfilled paper with sparse contour hatching|Quiet gestures read through silhouette and spacing
Three grouped stages; cutaway diagrams; clear directional arrows|Limited teal, orange and cream|Precise clean diagram outlines|Flat diagram fills with clean separation|One concept per stage from overview to cutaway
Low camera; diagonal light pools; wet urban reflections|Black and white with one restrained amber accent|Dense confident brush inks|Opaque shadows, rain marks and reflective pavement|Hold the evidence in shadow before a lit reveal
One horizontal panel row; consistent medium camera; visible reversal|Flat warm spot colors on mostly white|Economical newspaper-cartoon ink|Clean spot fills and open white backgrounds|Setup, reversal and deadpan punchline in three beats
Impossible connected spaces; shifting scale; striking asymmetry|Indigo and coral painted colors|Dreamlike painted form edges|Soft painted surfaces within impossible architecture|Follow linked visual metaphors through changing scale
Sculpted dimensional forms; believable hands; cinematic depth|Warm key light against cool fill|Modeled contours defined by light|Woven cloth, ceramic roughness and subsurface skin|Cinematic close view with depth around the focal gesture
Small figures in misty landscapes; generous empty space; calligraphic rhythm|Monochrome black-to-gray ink|Expressive wet and dry calligraphic brush strokes|Pooling ink and unpainted rice paper|Distant landscape pauses around economical gestures
Grotesque expressions; crowded alley satire; rough panel borders|Black ink with punchy limited red|Raw scratchy outlines and unruly crosshatching|Dense rough handmade ink marks|Crowded visual satire compressed into a confrontational beat
Giant robot silhouette; articulated mechanical joints; extreme foreshortening|Saturated orange and teal with dark ruined-city shadows|Precise angular armor contours and motion lines|Hard-surface cel shading, gritty rubble and sparks|Large-scale mechanical action with cockpit-scale reaction details
Almost-touching gestures; ornate pointed arches; candlelike rimlight|Deep plum, black and amber|Elegant ink contours with dramatic cloth arcs|Heavy velvet shadows and thorny architectural detail|Linger on romantic distance and restrained longing
Asymmetrically cropped landscape; patterned garments; curling stylized waves|Flat indigo, ochre and vermilion|Elegant keyblock contours|Subtle woodblock print grain without gradients|Layer landscape planes into a flowing visual journey
Decisive protective silhouettes; gouged diagonal rhythm; huge black shapes|Black ink and ivory warm paper|Sharp chiseled relief-print strokes|Coarse carved wood grain and fibrous paper|One forceful gesture carried by diagonal carved marks
Functional gear assemblies; ornate Victorian machinery; suspended mechanical spaces|Warm brass, copper, sepia and teal|Intricate inked gears and rivet contours|Polished metal, rivets and drifting steam|Adventure views alternating with mechanism close-ups
Single visual metaphor; absurd scale contrast; exaggerated expressions|Limited ink wash on warm paper|Economical confident newspaper pen|Sparse wash and paper surface|A single-image social observation with an immediate joke
Soft rounded figures; uncluttered storybook staging; affectionate acting|Warm inviting storybook colors|Gentle colored-pencil edges and soft brush shapes|Matte gouache with colored-pencil grain|A simple caring action with room for wonder
Intimate two-panel framing; offset color edges; overprinted overlaps|Only coral and teal spot inks plus paper|Slightly misregistered printed contours|Risograph halftone grain on rough uncoated paper|Two small sequential gestures held at close range
Three side-by-side action panels; distinct poses; cliffhanger staging|Faded adventure spot colors on warm paper|Vintage crisp adventure brush inks|Coarse newsprint halftone|Spot danger, cross obstacle, catch the goal in one horizontal row
Torn photographic fragments; translucent paper layers; overlapping scales|Warm paper colors with painted accents|Cut and torn edges linked by stitched trails|Tape, pressed leaves and layered ephemera|Personal memory assembled from layered fragments
Thumbprinted sculpted figures; miniature practical sets; shallow focus|Warm clay colors with orange and teal accents|Irregular clay silhouettes and visible seams|Thumbprints, felt moss and cardboard scenery|A tactile close-up held like a stop-motion frame
Warped perspective; framing op-art spirals; rhythmic repetition|Acid magenta, cyan, lime and orange|Elastic black contours|Flat silkscreen separations and comic halftones|Exuberant visual movement around a clear central silhouette
Tiny figures against monumental surroundings; immense landscape depth; dramatic sky|Warm gold against deep blue shadows|Painterly line-and-color edges|Weathered stone and atmospheric painted depth|Vast establishing views before a small heroic focal action
Ordinary daily objects; subtle natural acting; intimate framing|Soft muted spot colors on paper|Casual hand-drawn ink|Light paper texture and modest spot fills|Small domestic actions separated by quiet pauses
Exploded mechanical inset; functional hardware; crisp shipboard perspective|Restrained steel, teal and orange|Ruler-clean technical ink|Crisp metal surfaces and precisely separated components|Large narrative view paired with an engineering inset
Grounded adult proportions; tired expressive eyes; detailed industrial spaces|Restrained black and white|Weighty brush blacks and purposeful crosshatching|Dense inked industrial detail|Tense hands and grounded faces held in cinematic silence
Nuanced adult gestures; elegant negative space; intimate two-panel staging|Black and white with fine gray screentones|Delicate graceful pen lines|Fine screentone shading|Hesitation followed by a subtle emotional response
Rounded friendly forms; big clear expressions; uncomplicated backgrounds|Bright manga spot colors|Bold economical manga ink|Simple clean spot fills|Three playful problem-solving action beats
Stacked romantic close-ups; elongated adult proportions; meaningful gazes|Luminous full color with soft-focus backgrounds|Refined elegant digital lines|Glossy hair and softly rendered skin|Near-touching hands followed by a held mutual gaze
Sweeping cloth arcs; fluid martial-arts poses; misty mountain architecture|Limited earthy colors|Expressive Chinese-comic brush-ink motion|Misty washes and energetic ink accents|Leaping action follows long sweeping movement arcs
Immediately legible clues; calm organized perspective; carefully drawn architecture|Clean flat daylight colors|Fine even-thickness black contours|Flat cel fills with almost no hatching|Medium-wide views let readers track spatial evidence
Flattened village perspective; balanced plant motifs; patterned frames|Earthy ochre, brick red and forest green|Handmade folk-painted edges|Visible brush irregularity in flat painted areas|Decorative narrative symbols arranged in a balanced frame
Sinuous botanical framing; elongated figure poses; organized negative space|Flat jewel and earth colors|Fine graceful flowing contours|Decorative flat color enclosed by botanical linework|A still focal gesture structured by surrounding vines
Urban mural scale; angular action outlines; layered stencils|Bold spray-painted color fields|Expressive angular outlines and stencil edges|Aerosol softness, drips, brick and concrete|Energetic street-scale action framed by the wall surface
Layered leaf silhouettes; visible scissor-cut edges; shallow cast shadows|Limited warm orange, teal and cream|Uneven cut-paper edges without drawn outlines|Fibrous paper and physical overlap|A clear reaching gesture staged across layered depth
Orthographic mechanism inset; exploded views; dimensional guide arrows|Thin white drafting marks on deep cyan-blue|Precise drafting lines and construction circles|Blueprint-like flat ink and guide geometry|Two narrative stages linked by an exploded mechanism
Terrified eye inset; oppressive architectural perspective; uncanny organic shadows|Stark black and white|Intricate manga ink hatching|Deep black voids and fine decaying detail|A distant unsettling shape followed by an eye close-up
Only basic geometric pieces; enormous negative space; balanced asymmetry|Cream, navy, tan, orange and teal flat fills|No outlines, only straight and curved shape edges|Uniform flat fills without shading|Three sparse actions using the same repeated geometric pieces
Readable cartographic geography; dotted route; tiny environmental vignettes|Warm parchment and natural map colors|Charming detailed cartographic ink|Parchment surface with fine landmark detail|Read the journey through landmarks along a route
Purposeful glass segments; convincing dark lead cames; transmitted light|Jewel blue, amber, emerald and ruby|Thick dark lead dividers around colored pieces|Rippling translucent glass with luminous edges|A single figurative composition read through segmented color
Visible polygon planes; angular terrain; coherent angled camera|Restrained orange and teal with stone colors|Crisp faceted polygon boundaries|Flat-shaded triangles and contact shadows|Spatial action staged through clearly separated faceted space
Big optimistic heroic pose; radial action burst; classic panel framing|Bright flat four-color printing|Strong clean superhero brush inks|Visible Ben-Day halftones|One bold heroic action inside a simple classic frame
Anthropomorphic animal acting; rounded squash-and-stretch; three-panel gag|Cheerful flat Sunday-funnies colors|Clean vintage cartoon ink|Simple flat fills and open cartoon backgrounds|A simple animal plan, a surprising mishap, an expressive payoff
Layered past and present; ordinary family objects; reflective expressions|Restrained watercolor and gray wash|Personal observational pen marks|Soft paper washes and memory-like fading|Present action interrupted by two small memory panels
Puffed-up caricatures; contrasting symbolic actions; single editorial image|Limited spot red and gray wash|Confident loose satirical pen|Sparse expressive wash on paper|One image contrasts a hollow public gesture with a real action
Strong anatomy; rugged ruins; muscular diagonals|Earthy painted fantasy colors|Dense dramatic fantasy inks|Weathered stone, cloth and painted shadows|Dangerous diagonal action with a clear protected focal point
Improbable retro rockets; enormous ringed planets; painted rimlight|Saturated cyan, crimson and ochre|Painted pulp-cover contours|Airbrushed atmosphere and aged-print grain|A single spectacular discovery framed like a pulp cover
Sweeping transformation arcs; botanical magic motifs; flowing fabric|Luminous pastels with sparkling accents|Crisp delicate manga lines|Sparkling screentones and luminous fabric highlights|A graceful dynamic gesture carried through a magical arc
Athletic foreshortening; determined eye inset; concentrated impact|Black and white sports-manga contrast|Thick-to-fine kinetic pen strokes|Speed lines, screentones and gritty action marks|Sprint and dive build to a sharply emphasized impact
Desolate ruined spaces; small hopeful silhouettes; worn survival objects|Desaturated gray, ochre and green|Cinematic ink contours with painted atmosphere|Rust, cracked concrete and weathered cloth|Vast desolate establishing space around careful survival actions
Recognizable profile silhouettes; branching negative space; layered scene silhouettes|Solid black with pale moonlight and one amber glow|Clean cut-silhouette edges|Flat dark paper layers without facial shading|Wordless gesture carries movement through layered silhouettes
Distorted expressive space; forceful directional marks; erased highlights|Strict charcoal black, gray and white|Broad smudged charcoal strokes|Dusty broken edges, finger-rubbed grays and rough paper tooth|One intensely emotional posture under directional pressure
Three process stages; enlarged process cutaway; meaningful arrows|Clean blue, orange and green|Friendly readable scientific outlines|Cleanly separated explanatory fills|Observe a process, show its internal change, then reveal the outcome
Human-scale green infrastructure; lush biodiversity; practical garden architecture|Warm sunlit greens and welcoming natural colors|Detailed clean comic lines|Leaf detail and practical architectural surfaces|Environmental establishing scenes with everyday community actions
Monumental creature silhouette; building-scale perspective; tiny foreground figures|Selective orange and teal over cinematic inks|Bold cinematic manga inks|Billowing dust, water and rough botanical forms|Reveal immense scale through foreground reaction and distant action
Ruled notebook page; crossed-out attempts; uneven little panels|Black pen with tiny orange and teal pencil accents|Relaxed imperfect doodle contours|Ruled paper and spontaneous pen marks|Follow small sketches and arrows around a wandering sequence
Parallel isometric axes; visible stairs and bridges; stacked explorable spaces|Lively orange, teal and stone colors|Crisp isometric illustrative edges|Clean diorama surfaces and sharply separated structures|Trace a clear path through a cutaway environmental puzzle
Elastic noses and brows; charming detailed everyday settings; clear visual humor|Warm flat European cartoon colors|Lively clear cartoon contours|Clean flat fills and detailed small scenery|Overcomplicated setup, simple solution, sheepish reaction
Repeated anxious reflections; oppressive negative space; tight eye inset|Restrained psychological monochrome|Detailed fine pen work with heavy black masses|Precise screentones and rain-soaked glass|Build internal uncertainty through subtly changed reflections
Flowing sleeves; detailed period architecture; atmospheric period depth|Rich ink with subtle historical color|Elegant flowing figure contours|Carved timber detail and atmospheric ink washes|A careful traveling gesture within a detailed historical setting
One horizontal row; stable domestic camera; familiar domestic props|Restrained flat colors with lots of white|Economical newspaper-cartoon lines|Sparse flat fills in a recurring domestic setting|Setup, puzzlement and expressive domestic payoff
Carved key lines; rhythmic foliage; stylized clouds|Layered indigo, ochre and brick-red pigment|Bold carved woodblock contours|Uneven wood grain and gentle registration offsets|A folkloric focal action surrounded by rhythmic printed forms
Dramatic distant scenery; dramatic figure silhouettes; luminous mist|Saturated violet, cyan and amber|Softly controlled airbrush edges|Glossy highlights and graduated misty light|Hold a spectacular fantasy tableau around one suspended gesture
Varied sequential framing; clear eye-lines; gesture-only causality|Confident black and white|Elegant silhouette-defining ink|Open whites against disciplined solid ink|Three distinct cause-and-effect beats without words
Staged photographic panels; coherent garden sets; consistent camera lighting|Natural photographic colors with warm costume accents|Photographic edges without drawn outlines|Real skin, woven fabric and practical prop surfaces|Notice, reach and share a reaction across three photographs
Oversized translucent flowers; tender dream staging; hazy layered light|Peach, lavender and mint|Feathery powder-soft pastel edges|Chalky pastel marks and soft material grain|A gentle drifting gesture held in a hazy scene
Stepped towers; symmetrical fan ribs; glamorous architectural perspective|Disciplined gold, black and teal|Crisp decorative angular geometry|Restrained metallic highlights|A ceremonial entrance framed by streamlined architecture
Investigative shafts of light; predominantly black surface; incised reflections|Bright white cut into deep black|Razor-scratched white lines|Stippled highlights and fine incised surface detail|Reveal evidence through a narrow light shaft in deep shadow
Observation-driven action; clear problem-solving; useful explanatory arrows|Lively orange, teal and green|Friendly precise comic drawing|Clean explanatory color fills|Observe a problem, act on a mechanism, show the consequence
Heavy industrial scale; low-angle machinery action; exposed pistons|Restrained ochre, teal and charcoal|Gritty black brush inks|Riveted steel, smoky exhaust and industrial grime|Race through large machinery toward a clear rescue beat
Continuous-weight contours; purposeful blank space; readable sparse gestures|Black on white with few orange and teal accents|Thin rounded monoline of constant weight|Unshaded white space and flat accent shapes|One simple passing gesture supported by generous spacing
Flattened side-on figures; repeating leafy border; stylized beasts and flowers|Earthy wool red, gold, green and blue|Stitched contours within woven shapes|Interlaced threads and visible textile structure|A lateral journey framed as a woven narrative band
Extreme facial changes; uncluttered horizontal panels; contrasting final close-up|Simple flat digital cartoon colors|Economical expressive digital lines|Clean flat fills without busy backgrounds|Hopeful setup followed by an enormous shocked reaction
Simultaneous viewpoints; tilted flattened space; analytic fragmentation|Ochre, blue and charcoal|Intersecting angular plane boundaries|Subtle collage-like painted grain|Reassemble a readable action through rhythmic viewpoint fragments
Sparse receding grids; uncanny retro spaces; stylized sunset reflections|Saturated magenta, cyan and ultramarine|Clean digitally defined architectural edges|Glossy surfaces and early-digital gradients|Linger in a surreal empty space around a central silhouette
Frontal solemn symmetry; elongated stylized features; patterned arched setting|Burnished gold and rich jewel pigments|Fine repeated decorative contours|Tempera-like surface and tessera-like detail|A still frontal presentation with ceremonial emphasis
Strict modular grid; dominant sans-serif numerals; asymmetric white space|Black with red and teal on white|Flat vector-sharp pictogram geometry|Uniform print fills without shadows|Three ordered stages led by numbers, arrows and labels
Articulated cutout joints; perforated decorative edges; flat theatrical staging|Dark translucent silhouettes on warm backlight|Intricate cutout edges with delicate visible rods|Layered leather or paper on a lit screen|Side-on puppet gestures unfold across a shallow stage
Tapered engraved lines; disciplined crosshatching; finely observed foliage|Warm black-brown ink on ivory rag paper|Extremely precise copperplate incisions|Stipple and line-density intaglio tones|Quiet examination within an intricately hatched botanical scene
Three adjoining fabric blocks; appliqué figures; imperfect handmade joins|Warm harmonious patchwork fabric colors|Hand-stitched outlines and visible seams|Fabric weave, batting relief and layered cloth|Read three sequential textile blocks as a small journey
Aggressive asymmetric scale; exposed panel boundaries; deadpan close-up|Stark black and white with one orange accent|Blunt uneven digital pen marks|Raw flat black shapes without soft rendering|Failure, unexpected success and a deadpan reaction
Flattened mural gestures; simple architectural frame; worn figure edges|Mineral ochre, terracotta, green earth and chalk white|Broad softly worn painted contours|Matte plaster, subtle cracks and missing wall areas|A restrained garden action laid out as a wall narrative
Botanical contact silhouettes; translucent leaf overlaps; sensitized paper edges|Monochrome Prussian blue and pale white|Delicate photogram-like silhouettes|Contact-print tonal detail and uneven cyanotype edges|A clear adventure silhouette integrated into botanical impressions
Mismatched photographic fragments; absurd scale changes; torn fabric forms|Bold red, black and cream interruptions|Scissor-cut and torn collage edges|Glued paper, fabric and newsprint-like scraps|Irrational juxtaposition held together by a searching action
Forceful diagonal wedges; stark figure crops; disciplined poster hierarchy|Red, black and cream|Hard geometric edges and photomontage-like crops|Rough printed texture|A strong diagonal gesture directs attention through a poster-like scene
Distinct irregular tesserae; curved tile rows; figurative material relief|Ochre, teal, cream and blue|Contours built from rows of ceramic and glass tiles|Visible grout and subtly reflective facets|A single focal gesture read through patterned tile rhythm
Invented nonlinguistic marks; small figurative anchor; deliberate white space|Expressive dark ink on cream paper|Variable flowing handwritten strokes|Visible ink rhythm across open paper|Figurative forms dissolve into abstract marks across a sequence
Three-stage diagram; simple process cross-section; meaningful arrows|White, yellow, teal and orange on deep green-black|Powdery handwritten chalk strokes|Erased ghost marks and finger-smudged shading|Explain successive stages through a clear chalk diagram
Outside-to-inside panels; coherent translucent cutaways; ghosted overlapping forms|Cyan and white density contrasts on deep charcoal|Imaging-like translucent structural edges|Radiographic density and layered skeletal or botanical forms|Two sequential views connect exterior appearance to internal structure`.split('\n').map(row=>{
    const [signature,palette,linework,texture,pacing]=row.split('|');
    return {signature,palette,linework,texture,pacing};
  });

  // Short editorial suitability notes, in canonical ID order.
  const STYLE_FIT = `Best if your story has a big rooftop-scale action moment.|Avoid if a small private gesture should carry the scene.
Best if action needs expressive eyes and sharp inset close-ups.|Avoid if you want softly painted, low-contrast scenes.
Best if the setting deserves as much attention as the characters.|Avoid if detailed architecture would crowd a tiny panel.
Best if a joke depends on elastic poses and readable eyebrows.|Avoid if realistic physical restraint defines the characters.
Best if one oversized emotion should read at a glance.|Avoid if adult proportions or subtle danger must stay believable.
Best if a reveal needs a long pause before an emotional close-up.|Avoid if every beat must fit a tightly packed print grid.
Best if botanical atmosphere and careful hands carry the emotion.|Avoid if small lettering needs hard edges behind it.
Best if a quiet observation should feel like a sketchbook entry.|Avoid if faint construction lines would disappear on a phone.
Best if your adventure can read through small game-like sprites.|Avoid if nuanced facial acting needs many fine details.
Best if a gesture can carry the story through contour alone.|Avoid if color or surface detail is essential to the reveal.
Best if readers need to follow a process through clear stages.|Avoid if diagrams would break the emotional immersion.
Best if a clue should emerge from deep urban shadows.|Avoid if a bright, open atmosphere is central to the story.
Best if your joke has a clear setup, reversal and deadpan payoff.|Avoid if the scene needs a sprawling worldbuilding sequence.
Best if impossible spaces can express a connected visual metaphor.|Avoid if literal geography must be immediately unambiguous.
Best if cinematic lighting and dimensional acting sell the moment.|Avoid if a rough handmade surface is the main attraction.
Best if a small gesture belongs inside a spacious misty landscape.|Avoid if dense explanatory detail must fill every corner.
Best if crowded scratchy satire suits an unruly urban encounter.|Avoid if you need restrained expressions and clean visual order.
Best if giant machines and tiny human reactions create the stakes.|Avoid for quiet, talky scenes without mechanical spectacle.
Best if longing can be staged through distance and ornate shadows.|Avoid if brisk cheerful banter should set the pace.
Best if landscape rhythms and asymmetrical cropping guide the eye.|Avoid if naturalistic gradients are essential to depth.
Best if one forceful silhouette should feel carved into the page.|Avoid if delicate gray modeling is needed for the expression.
Best if functional gears and ornate machinery drive the adventure.|Avoid if machinery would distract from a bare emotional exchange.
Best if one absurd visual metaphor can make the whole joke.|Avoid if the argument needs several paragraphs of explanation.
Best if a gentle caring action needs warmth and rounded forms.|Avoid if harsh ambiguity or dread is the intended reaction.
Best if an intimate micro-story suits two visibly layered spot inks.|Avoid if the scene depends on a full photographic color range.
Best if distinct action beats should end on serial suspense.|Avoid if the moment needs a long uninterrupted contemplative view.
Best if personal memories can be assembled from tangible fragments.|Avoid if overlapping scraps would compete with long dialogue.
Best if a miniature handmade world is part of the story's charm.|Avoid if perfectly smooth industrial surfaces define the look.
Best if warped perspective and electric color energize the action.|Avoid if a calm visual field is needed to follow the plot.
Best if a tiny traveler should feel dwarfed by an ancient world.|Avoid if a close domestic exchange is the scene's main event.
Best if ordinary objects and small pauses make the moment matter.|Avoid if constant spectacle must push every beat forward.
Best if readers need to understand how a fictional machine works.|Avoid if exploded hardware detail would eclipse the characters.
Best if tired faces and grounded proportions carry adult tension.|Avoid if cute exaggeration should soften the dramatic stakes.
Best if adult romance turns on a hesitation or subtle hand gesture.|Avoid if broad slapstick reactions need to dominate the scene.
Best if playful problem-solving needs big expressions and clear steps.|Avoid if moral ambiguity requires a dense adult setting.
Best if a polished romantic gaze deserves a luminous close-up.|Avoid if rough monochrome marks should express the mood.
Best if sweeping clothes and martial movement can trace the action.|Avoid if rigid mechanical posing should define the sequence.
Best if readers should spot spatial clues in a well-ordered setting.|Avoid if heavy shadow must deliberately hide the evidence.
Best if flat village symbols and repeated motifs can tell the story.|Avoid if convincing deep perspective is central to the scene.
Best if flowing plants can structure a graceful fantasy composition.|Avoid if ornament would slow a fast chase or crowded battle.
Best if the story should feel painted at the scale of a city wall.|Avoid if spray texture would obscure a tiny delicate gesture.
Best if layered paper depth can make a simple action feel tactile.|Avoid if continuous smooth shading is needed to describe the forms.
Best if mechanical cause and effect needs a drafting-style inset.|Avoid if blueprint precision would make a tender scene feel cold.
Best if an uncanny shadow and a terrified eye can build dread.|Avoid if friendly openness is needed throughout the scene.
Best if repeated simple shapes can carry the action without detail.|Avoid if complex facial nuance is essential to understanding.
Best if a journey is best understood through routes and landmarks.|Avoid if most of the story is intimate face-to-face dialogue.
Best if light through jewel-colored segments can hold one key moment.|Avoid if many tiny gestures must read inside a dense glass pattern.
Best if an explorable setting should feel built from visible facets.|Avoid if soft skin and smooth organic curves are the main cues.
Best if an optimistic rescue needs a bold retro heroic pose.|Avoid if understated uncertainty should replace heroic confidence.
Best if animal acting and squash-and-stretch sell a cheerful gag.|Avoid if realistic human anatomy is part of the story's point.
Best if ordinary objects connect the present with a personal memory.|Avoid if the scene must stay in one uninterrupted action timeline.
Best if contrasting symbolic actions can expose a hollow public gesture.|Avoid if a neutral literal depiction is more useful than caricature.
Best if rugged anatomy and dangerous ruins support a fantasy struggle.|Avoid if gentle everyday stakes should stay small and familiar.
Best if an improbable retro space discovery deserves a cover-like image.|Avoid if sober engineering accuracy must lead the visual story.
Best if a transformation arc can express courage and magical wonder.|Avoid if sparkle and flowing fabric would dilute a gritty mood.
Best if physical effort builds to a sharply emphasized impact.|Avoid if still, relaxed conversation should carry the scene.
Best if a small hopeful act should stand against vast desolation.|Avoid if bright carefree surroundings are essential to the tone.
Best if clear profiles and gestures can tell a fairy tale without faces.|Avoid if minute facial expressions are needed for the payoff.
Best if forceful posture and smudged darkness express raw emotion.|Avoid if powdery marks would muddy important small details.
Best if an observable process needs a friendly cutaway explanation.|Avoid if dense labels would replace the characters' discovery.
Best if hopeful daily life belongs inside practical green infrastructure.|Avoid if a barren hopeless future is the story's premise.
Best if an immense creature needs tiny buildings and people for scale.|Avoid if the action should feel close, ordinary and human-sized.
Best if a wandering personal observation suits notebook sketches.|Avoid if polished production consistency is the central promise.
Best if the reader should trace a path through stacked explorable rooms.|Avoid if close facial acting matters more than spatial understanding.
Best if an overcomplicated plan ends with a simple visual solution.|Avoid if solemn restraint should replace elastic comic acting.
Best if small changes in repeated reflections can express uncertainty.|Avoid if direct external action should explain everything.
Best if flowing period clothing and canal architecture establish place.|Avoid if a contemporary minimal setting is essential to the story.
Best if a familiar home prop can set up a three-beat domestic joke.|Avoid if changing locations and cameras are needed in every beat.
Best if rhythmic carved foliage can frame a folkloric encounter.|Avoid if smooth atmospheric paint should define the environment.
Best if luminous fantasy spectacle needs glossy graduated light.|Avoid if flat printed color and hard ink edges are the goal.
Best if each action can be understood through eye-lines and gestures.|Avoid if the plot depends on spoken facts that images cannot convey.
Best if staged photographic reactions can carry a short sequence.|Avoid if impossible anatomy or drawn exaggeration drives the humor.
Best if a tender drifting moment needs powder-soft dream colors.|Avoid if high contrast is needed for a dense fast action scene.
Best if an elegant entrance should showcase geometric retro architecture.|Avoid if informal clutter and worn daily objects define the setting.
Best if a narrow light shaft should expose evidence in deep black.|Avoid if broad soft midtones must carry the expression.
Best if discovery should unfold through observation, action and consequence.|Avoid if a diagram alone explains the idea more clearly than a story.
Best if a rescue can move through heavy riveted industrial machinery.|Avoid if airy organic forms should keep the scene light.
Best if one sparse contour can make the gesture immediately readable.|Avoid if detailed shading is needed to distinguish the forms.
Best if a lateral journey can read like a woven narrative band.|Avoid if naturalistic depth is essential to orient the reader.
Best if the punchline is an enormous change in a character's face.|Avoid if subtle continuous acting should replace sudden reactions.
Best if shifting viewpoints can express a fractured perception.|Avoid if conventional spatial clarity is essential to the plot.
Best if an empty retro space should feel glossy, uncanny and nostalgic.|Avoid if natural earth colors must ground the scene.
Best if a still frontal presentation should feel solemn and ceremonial.|Avoid if fast changing camera angles carry the action.
Best if numbers, pictograms and a strict grid should lead the explanation.|Avoid if intimate character acting needs to dominate the page.
Best if a folkloric encounter can unfold as a shallow puppet stage.|Avoid if naturalistic facial modeling is necessary for the emotion.
Best if patient examination deserves intricate engraved line detail.|Avoid if fine hatching will be lost at the final display size.
Best if a small journey can be told through adjoining fabric blocks.|Avoid if smooth uninterrupted color fields define the visual goal.
Best if blunt scale changes and a deadpan face sell internet humor.|Avoid if rough marks would undermine needed visual precision.
Best if a restrained action should feel absorbed into an aged wall.|Avoid if glossy luminous surfaces are central to the scene.
Best if botanical silhouettes can carry an adventure in blue and white.|Avoid if full-color costume distinctions are needed to track characters.
Best if irrational fragments and absurd scale can support playful disruption.|Avoid if a literal sequence must be understood immediately.
Best if one strong diagonal can organize a poster-like message.|Avoid if gentle observational pacing is more important than visual force.
Best if a single focal gesture can unfold through patterned tile rows.|Avoid if tiny sequential expressions would be lost in grout and facets.
Best if meaning can emerge through abstract handwritten rhythm.|Avoid if readers must decode precise dialogue or instructions.
Best if a short lesson should feel drawn directly onto a chalkboard.|Avoid if erased powdery marks would reduce essential contrast.
Best if an outside-to-inside reveal can explain a fictional structure.|Avoid if viewers could mistake the illustration for a real diagnostic scan.`.split('\n').map(row=>{const [bestFor,avoidIf]=row.split('|');return {bestFor,avoidIf};});

  const FAMILIES = {
    'Classic comics': [1,3,13,23,26,49,50,52,65,68,76],
    'Manga & manhwa': [2,5,6,18,33,34,35,36,37,44,55,56,66,67],
    'Painted & handmade': [7,8,10,16,20,21,24,25,27,39,40,42,47,58,59,63,69,70,73,79,85,86,87,89,90,93],
    'Cinematic & genre': [12,19,22,30,31,38,51,53,54,57,61,62,71,72,75,77],
    'Digital & graphic': [4,9,11,15,28,32,43,45,46,48,60,64,74,78,80,82,84,95,96],
    'Experimental': [14,17,29,41,81,83,88,91,92,94]
  };

  const GENRES = {
    comedy:{label:'Comedy',ids:[4,13,50,65,68,80,23,5,31,63,28,17]},
    mystery:{label:'Mystery',ids:[12,38,75,33,21,26,10,59,66,86,90,3]},
    romance:{label:'Romance',ids:[7,34,36,19,40,73,31,6,27,51,20,15]},
    fantasy:{label:'Fantasy',ids:[7,30,40,53,58,69,79,46,47,16,22,87]},
    scifi:{label:'Sci-fi',ids:[18,32,43,54,61,74,82,77,15,64,96,48]},
    horror:{label:'Horror',ids:[12,44,59,66,85,21,57,75,33,17,94,14]},
    slice:{label:'Everyday & personal',ids:[6,8,31,51,63,78,13,7,10,27,34,68,72,25,21,90]},
    adventure:{label:'Adventure',ids:[1,2,3,22,53,54,64,26,37,48,62,77]},
    educational:{label:'Educational',ids:[11,60,76,84,95,43,96,45,10,32,90,63]}
  };
  const MOODS = {
    playful:{label:'Playful & funny',ids:[4,5,9,13,23,24,28,35,42,50,63,65,68,80,11]},
    warm:{label:'Warm & hopeful',ids:[3,4,7,10,24,27,31,34,39,40,42,50,51,61,73,76,87]},
    mysterious:{label:'Mysterious & moody',ids:[12,16,19,21,33,38,44,57,59,66,75,85,86,90]},
    dreamy:{label:'Dreamy & poetic',ids:[7,14,20,30,40,46,47,58,61,69,73,79,81,83,90]},
    dynamic:{label:'Bold & energetic',ids:[1,2,17,18,22,29,32,37,41,49,53,54,55,56,62,70,77,82,92]},
    intimate:{label:'Intimate & reflective',ids:[6,7,8,10,19,27,31,34,36,51,63,66,71,73,78]},
    cerebral:{label:'Thoughtful & clever',ids:[8,10,11,16,31,33,38,43,45,51,60,63,71,78,84,86,94,95]}
  };
  const FINISHES = {
    any:{label:'Any visual finish',ids:[]},
    clean:{label:'Clean & polished',ids:[3,4,5,6,10,11,13,18,24,35,36,38,45,50,60,65,68,71,76,78,80,84]},
    ink:{label:'Bold ink & contrast',ids:[1,2,12,16,17,20,21,33,37,44,49,54,57,59,75,85,86]},
    painterly:{label:'Soft & painterly',ids:[7,14,20,30,39,40,47,58,61,69,70,73,79,89,90]},
    textured:{label:'Tactile & handmade',ids:[8,17,21,25,27,31,39,41,42,51,59,63,79,85,87,89,91,93]},
    digital:{label:'Digital & dimensional',ids:[6,9,15,18,28,29,32,43,48,55,61,64,70,74,77,82,96]},
    minimal:{label:'Minimal & symbolic',ids:[10,11,13,16,23,38,45,58,60,71,78,80,84,94,95]}
  };
  const FORMATS = {
    page:{label:'Classic comic page',ids:[1,2,3,12,14,18,19,22,30,33,37,40,44,49,53,54,55,56,57,61,62,66,67,69,70,74,75,77,79,86,89,96]},
    strip:{label:'Short comic strip',ids:[4,13,23,26,31,35,50,65,68,71,80]},
    vertical:{label:'Vertical phone scroll',ids:[6,31,34,36,51,63,80]},
    social:{label:'Social post / carousel',ids:[11,13,23,25,27,29,41,45,63,68,80,84,95]},
  };
  const APPROACHES = {
    wordless:{label:'Mostly wordless',ids:[7,10,14,16,20,21,38,42,45,47,58,69,71,78,85,90,93]},
    explainer:{label:'Visual explainer',ids:[11,32,43,45,60,76,84,95,96]}
  };
  const FORMAT_SPECS={
    social:'one image per slide, 6–8 slides, 3:4 portrait. Keep faces, key action and any text inside a centered 4:5 area',
    vertical:'one image per panel, 3:4 portrait, or 9:16 for a tall dramatic panel',
    page:'one 3:4 portrait image with 4–6 panels in a grid and clear white gutters',
    strip:'one 16:9 widescreen image with 3–4 equal panels from left to right: setup, reaction, payoff'
  };
  const CAROUSEL_CHANNELS={instagram:'Instagram',linkedin:'LinkedIn',rednote:'RedNote'};
  const FORMAT_SIZES={social:'Portrait 3:4',vertical:'Portrait 3:4 or Story 9:16',page:'Portrait 3:4',strip:'Widescreen 16:9'};
  const AFTER_GENERATING={
    social:'Generate one image per slide with the same character description each time, then post as is.',
    linkedin:'Generate one image per slide with the same character description each time. Crop each slide to 4:5 (1080×1350), then combine the slides into one PDF.',
    vertical:'Generate one image per panel, then stack them top to bottom with white gaps (any image editor or Canva works).',
    page:'One image holds all the panels. If the panels look inconsistent, generate each panel separately and arrange them.',
    strip:'One image holds all the panels. If the panels look inconsistent, generate each panel separately and arrange them.'
  };
  const APPROACH_SPECS={wordless:'Use minimal or no text; communicate through clear gestures and sequential images.',explainer:'Use labels, arrows and simple diagrams to explain the idea.'};
  const AUDIENCES={everyone:'Everyone',kids:'Kids',teen:'Teens & young adults',adult:'Adults'};
  const AGE_SETS={kids:[4,5,9,13,24,35,42,50,55,58,65,68,76,87],teen:[1,2,3,6,7,15,18,22,29,30,36,37,40,46,48,49,53,54,55,56,61,62,64,73,74,77,82],adult:[12,17,19,21,27,31,33,34,44,51,52,57,59,66,72,75,88,91,94]};
  const ID_FAMILY=new Map();Object.entries(FAMILIES).forEach(([family,ids])=>ids.forEach(id=>ID_FAMILY.set(id,family)));
  const contains=(list,id)=>list.includes(id);
  const STYLES=STYLE_NAMES.map((name,i)=>{
    const id=i+1;const family=ID_FAMILY.get(id)||'Experimental';
    const genres=Object.keys(GENRES).filter(g=>contains(GENRES[g].ids,id));
    const moods=Object.keys(MOODS).filter(g=>contains(MOODS[g].ids,id));
    const finishes=Object.keys(FINISHES).filter(g=>g!=='any'&&contains(FINISHES[g].ids,id));
    const formats=Object.keys(FORMATS).filter(g=>g!=='any'&&contains(FORMATS[g].ids,id));
    const audience=Object.keys(AGE_SETS).filter(g=>contains(AGE_SETS[g],id));
    return {id,name,family,...VISUAL_DETAILS[i],...STYLE_FIT[i],signatureConfidence:"high",signatureSource:`art_manifest.json#${id}`,genres,moods,finishes,formats,audience};
  });
  const BY_ID=new Map(STYLES.map(s=>[s.id,s]));
  if(STYLES.length!==96||VISUAL_DETAILS.length!==96||STYLE_FIT.length!==96||new Set(STYLE_NAMES).size!==96||STYLES.some((s,i)=>s.id!==i+1)) throw new Error('Catalog integrity failure: 96 canonical styles required.');


  // Story type and the other guided choices drive matching; story writing stays in the AI tool.
  const ENABLE_RECIPE_DOWNLOAD=false;
  const STORAGE='comic_style_finder_v2';
  const GENRE_ORDER=['comedy','romance','mystery','slice','fantasy','scifi','horror','adventure','educational'];
  const GENRE_UI={
    comedy:['😄','Comedy','Funny situations, big reactions, witty twists'],
    romance:['💌','Romance','Connections, longing, sparks and heart'],
    mystery:['🔍','Mystery','Clues, tension and surprising reveals'],
    slice:['☕','Everyday & personal','Daily moments, real experiences and memories'],
    fantasy:['✨','Fantasy','Wonder, magic and imagined worlds'],
    scifi:['🪐','Sci-fi','Futures, technology and new frontiers'],
    horror:['🌘','Horror','Suspense, dread and the unknown'],
    adventure:['🧭','Adventure','Journeys, discoveries and big stakes'],
    educational:['💡','Educational','Make ideas easy and fun to understand']
  };
  const FEELING_ORDER=['playful','warm','mysterious','dreamy','dynamic','intimate','cerebral','any'];
  const FEELING_UI={
    playful:['😆','Funny & light','Make them smile or laugh'],
    warm:['🌤️','Warm & hopeful','Leave them feeling good'],
    mysterious:['🕯️','Tense & curious','Keep them guessing'],
    dreamy:['🌙','Dreamy & wondrous','Transport them somewhere else'],
    dynamic:['⚡','Excited & energized','Give them an adrenaline rush'],
    intimate:['💛','Moved & connected','Make them care deeply'],
    cerebral:['🧠','Thoughtful & clever','Give them something to think about'],
    any:['✳','Surprise me','I’m open to different feelings']
  };
  const FORMAT_ORDER=['any','social','vertical','page','strip'];
  const FORMAT_UI={
    any:['✳','Not sure yet','Help me choose what works'],
    social:['▥','Social carousel','Swipeable images for Instagram, LinkedIn or RedNote'],
    vertical:['↡','Vertical webcomic','Scroll down one panel at a time'],
    page:['▦','Classic comic page','4–6 panels with clear white gutters'],
    strip:['▤','Short comic strip','3–4 equal panels, read left to right']
  };
  const COLOR_IDS={bright:[1,4,5,9,15,18,22,24,29,35,42,49,50,55,60,61,62,65,70,73,74,76,80,82],soft:[3,7,8,24,27,31,34,39,40,42,51,58,63,69,73,79,87,89],mono:[2,8,10,12,16,21,33,38,44,45,59,66,71,75,78,85,86,90,94,95,96]};
  const COLOR_LABELS={any:'No preference',bright:'Bright & colorful',soft:'Soft & muted',mono:'Mostly black & white'};

  const RECIPE_LIMITS={palette:300,linework:300,texture:300,pacing:300,consistency:800};
  const DEFAULT={step:1,genre:null,mood:'any',format:'any',carouselChannel:'instagram',approach:'any',finish:'any',audience:'everyone',color:'any',selected:null,detailsOpen:false,recipeEdits:{},tab:'recommended',query:'',family:'all'};
  function initialState(){return {...DEFAULT,recipeEdits:{}};}
  function loadState(){
    try{
      const raw=localStorage.getItem(STORAGE);
      if(!raw)return initialState();
      const obj=JSON.parse(raw);
      if(!obj||typeof obj!=='object'||Array.isArray(obj))return initialState();
      const s=initialState();
      for(const key of Object.keys(s))if(Object.hasOwn(obj,key))s[key]=obj[key];
      if(s.genre==='memoir')s.genre='slice';
      if(s.genre==='kids'){s.genre=null;s.audience='kids';}
      if(typeof s.format==='string'&&Object.hasOwn(APPROACHES,s.format)){s.approach=s.format;s.format='any';}
      if(typeof s.approach!=='string'||(s.approach!=='any'&&!Object.hasOwn(APPROACHES,s.approach)))s.approach='any';
      if(s.genre!==null&&(typeof s.genre!=='string'||!Object.hasOwn(GENRES,s.genre)))s.genre=null;
      if(typeof s.mood!=='string'||!Object.hasOwn(FEELING_UI,s.mood))s.mood='any';
      if(typeof s.format!=='string'||!Object.hasOwn(FORMAT_UI,s.format))s.format='any';
      if(typeof s.carouselChannel!=='string'||!Object.hasOwn(CAROUSEL_CHANNELS,s.carouselChannel))s.carouselChannel='instagram';
      if(typeof s.finish!=='string'||!Object.hasOwn(FINISHES,s.finish))s.finish='any';
      if(typeof s.color!=='string'||!Object.hasOwn(COLOR_LABELS,s.color))s.color='any';
      if(typeof s.audience!=='string'||!Object.hasOwn(AUDIENCES,s.audience))s.audience='everyone';
      if(typeof s.family!=='string'||(s.family!=='all'&&!Object.hasOwn(FAMILIES,s.family)))s.family='all';
      s.selected=Number.isInteger(s.selected)&&BY_ID.has(s.selected)?s.selected:null;
      s.detailsOpen=!!s.selected&&(typeof obj.detailsOpen==='boolean'?obj.detailsOpen:true);
      const edits=s.recipeEdits;
      s.recipeEdits={};
      if(edits&&typeof edits==='object'&&!Array.isArray(edits)){
        for(const [key,limit] of Object.entries(RECIPE_LIMITS)){
          if(Object.hasOwn(edits,key)&&typeof edits[key]==='string')s.recipeEdits[key]=edits[key].slice(0,limit);
        }
      }
      s.step=Number.isInteger(s.step)&&s.step>=1&&s.step<=4?s.step:1;
      if(s.step>1&&s.step<4&&!s.genre)s.step=1;
      s.tab=s.tab==='all'?'all':'recommended';
      s.query=typeof s.query==='string'?s.query.slice(0,90):'';
      return s;
    }catch{return initialState();}
  }
  const state=loadState();
  let catalogLimit=24,toastTimeout=0;
  const scrollBehavior=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  const $=id=>document.getElementById(id);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug=v=>(v||'style').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,45)||'style';
  const imgUrl=id=>window.COMIC_ART_ASSETS?.[String(id)]||`art/${String(id).padStart(3,'0')}.webp`;
  const preview=(s,lazy=true)=>`<img src="${imgUrl(s.id)}" alt="AI-generated illustrative sample for ${esc(s.name)} featuring invented characters" ${lazy?'loading="lazy"':''}>`;
  const typeLabel=()=>state.genre?(GENRE_UI[state.genre]?.[1]||GENRES[state.genre].label):'All stories';
  const feelLabel=()=>state.mood==='any'?'Any feeling':FEELING_UI[state.mood][1];
  const formatLabel=()=>FORMAT_UI[state.format][1];
  function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{}}
  function toast(message){const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,3100);}
  function lineworkFor(s){return s.linework;}
  function paletteFor(s){return s.palette;}
  function textureFor(s){return s.texture;}
  function pacingFor(s){return s.pacing;}
  function cautionFor(s){return s.avoidIf;}
  function scoreStyle(s){
    let score=0;const why=[];
    if(state.genre){const n=GENRES[state.genre].ids.indexOf(s.id);if(n>=0){score+=n<4?12:n<8?9:6;why.push(`Story type match: ${typeLabel()}`);}}
    if(state.mood!=='any'&&MOODS[state.mood].ids.includes(s.id)){score+=8;why.push(`Reader feeling match: ${FEELING_UI[state.mood][1]}`);}
    if(state.format!=='any'&&FORMATS[state.format].ids.includes(s.id)){score+=9;why.push(`Reading format match: ${formatLabel()}`);}
    if(state.approach!=='any'&&APPROACHES[state.approach].ids.includes(s.id)){score+=8;why.push(`Approach match: ${APPROACHES[state.approach].label}`);}
    if(state.finish!=='any'&&FINISHES[state.finish].ids.includes(s.id)){score+=3;why.push(`Has a ${FINISHES[state.finish].label.toLowerCase()} treatment`);}
    if(state.color!=='any'&&COLOR_IDS[state.color].includes(s.id)){score+=3;why.push(`Supports your ${COLOR_LABELS[state.color].toLowerCase()} preference`);}
    if(state.audience!=='everyone'&&s.audience.includes(state.audience)){score+=3;why.push(`Often accessible to ${AUDIENCES[state.audience].toLowerCase()}`);}
    return {score,why:why.length?why:[s.signature]};
  }
  function matchesRefinements(s){return (state.finish==='any'||FINISHES[state.finish].ids.includes(s.id))&&(state.color==='any'||COLOR_IDS[state.color].includes(s.id))&&(state.audience==='everyone'||s.audience.includes(state.audience));}
  function topStyles(){
    if(!state.genre&&state.mood==='any'&&state.format==='any'&&state.approach==='any'&&state.finish==='any'&&state.color==='any'&&state.audience==='everyone')return [13,7,38,6,31,4].map(id=>({s:BY_ID.get(id),...scoreStyle(BY_ID.get(id))}));
    const scored=STYLES.filter(matchesRefinements).map(s=>({s,...scoreStyle(s)})).sort((a,b)=>b.score-a.score||a.s.id-b.s.id);
    const picks=[],familyCount={};
    for(const row of scored){if(picks.length>=6)break;if((familyCount[row.s.family]||0)>=2)continue;picks.push(row);familyCount[row.s.family]=(familyCount[row.s.family]||0)+1;}
    return picks;
  }
  function progress(){
    const stages=['Story type','Feeling','Format','Discover'];
    $('progressNav').innerHTML=stages.map((label,i)=>{
      const n=i+1,isActive=state.step===n,done=state.step>n,disabled=(n===2||n===3)&&!state.genre;
      return `${i?'<span class="progress-arrow" aria-hidden="true">→</span>':''}<button type="button" class="progress-step ${isActive?'active':done?'complete':''}" ${disabled?'disabled':''} data-step="${n}" ${isActive?'aria-current="step"':''}><span class="step-num">${done?'✓':String(n).padStart(2,'0')}</span>${label}</button>`;
    }).join('');
  }
  function intro(step,title,description){return `<div class="stage-intro"><span class="step-counter">0${step} / 04</span><p class="eyebrow"><span class="warm-dot">✳</span> ${step===4?'THE STYLE DISCOVERY':'FIND YOUR COMIC STYLE'}</p><h1 id="wizardTitle" tabindex="-1">${title}</h1><p class="lead">${description}</p></div>`;}
  function footer(back,next,note,disabled=false,nextAction='next'){
    return `<div class="stage-footer"><div class="footer-note">${note}</div><div class="footer-actions">${back?'<button type="button" class="btn btn-secondary" data-action="previous">← Back</button>':''}<button type="button" class="btn btn-primary" data-action="${nextAction}" ${disabled?'disabled':''}>${next} <span class="button-arrow" aria-hidden="true">→</span></button></div></div>`;
  }
  function renderGenre(){
    const genreCards=GENRE_ORDER.map(key=>{const [emoji,name,desc]=GENRE_UI[key],active=state.genre===key;return `<button type="button" class="choice-card ${active?'active':''}" aria-pressed="${active}" data-genre="${key}"><span class="tick" aria-hidden="true">✓</span><span class="emoji" aria-hidden="true">${emoji}</span><span class="choice-name">${name}</span><span class="choice-desc">${desc}</span></button>`;}).join('');
    return `<section class="stage-surface" aria-labelledby="stageTitle">${intro(1,'What kind of <em>story?</em>','Pick the closest story category. Next, choose the reader’s feeling and reading format. No script or art knowledge needed.')}
      <div class="stage-body"><p class="section-kicker" id="stageTitle">Choose one starting point</p><div class="genre-grid">${genreCards}</div><p class="inline-help">Not an exact fit? Pick the closest one—you can change it later.</p>
      </div>${footer(false,'Choose the feeling','Story type describes the story you want to tell. You’ll explore its look after the three questions.',!state.genre)}</section>`;
  }
  function renderFeeling(){
    const cards=FEELING_ORDER.map(k=>{const [emoji,name,desc]=FEELING_UI[k],active=state.mood===k;return `<button type="button" class="choice-card mood-card ${active?'active':''}" data-mood="${k}" aria-pressed="${active}"><span class="tick" aria-hidden="true">✓</span><span class="emoji" aria-hidden="true">${emoji}</span><span class="choice-name">${name}</span><span class="choice-desc">${desc}</span></button>`;}).join('');
    return `<section class="stage-surface" aria-labelledby="stageTitle">${intro(2,'How should readers <em>feel?</em>','The same kind of story can be funny, tender, tense or surprising. Pick the reaction you want most.')}
      <div class="stage-body"><p class="section-kicker" id="stageTitle">Choose the emotion to emphasize</p><div class="choice-grid">${cards}</div><p class="inline-help">There are no wrong answers. “Surprise me” is a valid choice.</p></div>${footer(true,'Choose the format','The mood influences the colors, linework and pacing we suggest.')}</section>`;
  }
  function renderFormat(){
    const cards=FORMAT_ORDER.map(k=>{const [icon,name,desc]=FORMAT_UI[k],active=state.format===k;return `<button type="button" class="choice-card format-card ${active?'active':''}" data-format="${k}" aria-pressed="${active}"><span class="tick" aria-hidden="true">✓</span><span class="mini-layout format-${k}" aria-hidden="true">${k==='any'?'✳':k==='social'?'<svg viewBox="0 0 72 44" fill="none" stroke="currentColor" stroke-width="2"><rect x="28" y="2" width="24" height="32" rx="2"/><rect x="23" y="6" width="24" height="32" rx="2"/><rect x="18" y="10" width="24" height="32" rx="2"/></svg>':'<i></i><i></i><i></i><i></i>'}</span><span class="choice-name">${name}</span><span class="choice-desc">${desc}</span>${k==='page'||k==='strip'?'<span class="format-hint">Works best with simple scenes</span>':''}</button>`;}).join('');
    return `<section class="stage-surface" aria-labelledby="stageTitle">${intro(3,'How will people <em>read it?</em>','Choose a reading format, then an optional storytelling approach. “Not sure yet” keeps your options open.')}
      <div class="stage-body"><p class="section-kicker" id="stageTitle">Choose a reading format</p><div class="choice-grid format-grid">${cards}</div>
      ${state.format==='social'?`<fieldset class="channel-picker"><legend>Social carousel channel</legend><div class="channel-options">${Object.entries(CAROUSEL_CHANNELS).map(([key,label])=>`<label class="channel-option"><input type="radio" name="carouselChannel" value="${key}"${state.carouselChannel===key?' checked':''}>${label}</label>`).join('')}</div></fieldset>`:''}
      <fieldset class="approach-options"><legend>Storytelling approach <span class="optional-sub">Optional · choose one, or leave both off</span></legend>${Object.entries(APPROACHES).map(([k,v])=>`<button type="button" class="approach-toggle" data-approach="${k}" aria-pressed="${state.approach===k}">${esc(v.label)}</button>`).join(' ')}</fieldset>

      </div>${footer(true,'See my style matches','You can change these choices any time. Your matches are suggestions, not fixed rules.')}</section>`;
  }
  function resultsFiltersMarkup(){return `<fieldset class="results-filters"><legend>Refine your matches</legend><div class="refinement-grid"><label for="finishSelect">Art treatment<select class="select-field" id="finishSelect">${Object.entries(FINISHES).map(([k,v])=>`<option value="${k}" ${state.finish===k?'selected':''}>${esc(v.label)}</option>`).join('')}</select></label><label for="colorSelect">Color preference<select class="select-field" id="colorSelect">${Object.entries(COLOR_LABELS).map(([k,v])=>`<option value="${k}" ${state.color===k?'selected':''}>${esc(v)}</option>`).join('')}</select></label><label for="audienceSelect">Intended audience<select class="select-field" id="audienceSelect">${Object.entries(AUDIENCES).map(([k,v])=>`<option value="${k}" ${state.audience===k?'selected':''}>${esc(v)}</option>`).join('')}</select></label></div></fieldset>`;}
  function card(s){
    return `<article class="style-card"><button type="button" class="style-card-open" data-action="detail" data-id="${s.id}" aria-label="View ${esc(s.name)} details"><span class="style-art">${preview(s)}</span><span class="style-card-body"><span class="style-family">${esc(s.family)}</span><span class="style-name">${esc(s.name)}</span><span class="style-desc">${esc(s.signature)}</span><span class="reason-block">${esc(s.bestFor)}</span><span class="card-link" aria-hidden="true">View details ↗</span></span></button></article>`;
  }
  function selectedRecipe(){if(!state.selected)return null;const s=BY_ID.get(state.selected);return {
    palette:paletteFor(s),linework:lineworkFor(s),texture:textureFor(s),pacing:pacingFor(s),
    consistency: continuityInstruction,
    ...state.recipeEdits
  };}
  const continuityInstruction='Keep recurring characters recognizable from panel to panel.';
  const promptText=value=>String(value??'').replace(/&/g,'and');
  const STORY_PLACEHOLDER='Story: [Who is it about, where are they, and what happens? 1–3 sentences]';
  // The full wrapper begins with the editable Story placeholder; style-only has no wrapper.
  const editInstructions=()=>['palette','linework','texture','pacing'].some(key=>Object.hasOwn(state.recipeEdits,key))?' Edited visual fields take precedence over the signature.':'';
  const cleanPromptValue=value=>String(value||'').trim().replace(/[.!\s]+$/,'');
  function styleOnlyPrompt(s){
    const r=selectedRecipe()||{};
    const treatment=[['Palette',r.palette],['Linework',r.linework],['Texture',r.texture],['Pacing',r.pacing]].map(([label,value])=>`${label}: ${cleanPromptValue(value)}.`).join(' ');
    const feeling=promptText(feelLabel()).toLowerCase();
    const mood=state.mood!=='any'?` Aim for ${/^[aeiou]/i.test(feeling)?'an':'a'} ${feeling} feeling.`:'';
    const approach=APPROACH_SPECS[state.approach]?` ${APPROACH_SPECS[state.approach]} Approach instructions override sample text and labeling conventions.`:'';
    return promptText(`Style: ${s.name}. ${s.signature}. ${treatment}${editInstructions()}${mood}${approach}`);
  }
  function formatInstructions(){
    if(!FORMAT_SPECS[state.format])return '';
    const r=selectedRecipe()||{};
    return promptText(`Format: ${formatLabel()} — ${FORMAT_SPECS[state.format]}. Apply this layout instead of the sample panel arrangement. Consistency: ${cleanPromptValue(r.consistency)||cleanPromptValue(continuityInstruction)}.`);
  }
  function stylePrompt(s){return [STORY_PLACEHOLDER,styleOnlyPrompt(s),formatInstructions()].filter(Boolean).join('\n\n');}
  // Retain the full-wrapper export through the existing compatibility key.
  function panelPrompt(s){return stylePrompt(s);}

  function generationGuidance(){
    const size=FORMAT_SIZES[state.format];
    if(!size)return {before:'',after:''};
    return {before:`Before generating, set your tool's image size to ${size}. In ChatGPT, use the image size option; 'Auto' usually makes squares.`,after:AFTER_GENERATING[state.format==='social'&&state.carouselChannel==='linkedin'?'linkedin':state.format]};
  }
  function recipeMarkup(){
    if(!state.selected)return '';
    const s=BY_ID.get(state.selected),r=selectedRecipe(),guidance=generationGuidance();
    const fields=[['palette','Color palette'],['linework','Linework'],['texture','Texture / finish'],['pacing','Panel pacing']]
      .map(([key,label])=>`<label>${label}<input data-recipe-field="${key}" value="${esc(r[key])}" maxlength="300"></label>`).join('');
    return `<section class="selected-zone" id="selectionZone" aria-labelledby="selectedTitle">
      <div class="selected-sample">${preview(s,false)}</div>
      <div class="selected-top"><h1 id="selectedTitle" tabindex="-1">${esc(s.name)}</h1><button class="btn-text" type="button" data-action="clear-selection">← Back to results</button></div>
      <div class="prompt-block">
        <h2 class="prompt-label">READY-TO-USE STYLE PROMPT</h2>
        <p class="style-prompt" id="stylePromptText">${esc(stylePrompt(s))}</p>
        ${guidance.before?`<p class="generation-size">${esc(guidance.before)}</p>`:''}
        <button type="button" class="btn btn-primary prompt-copy-button" data-action="copy-style">Copy Style Prompt</button>
        <p class="prompt-guidance">Replace the bracketed line with your story before you paste.</p>
        ${guidance.after?`<p class="generation-after"><strong>After generating:</strong> ${esc(guidance.after)}</p>`:''}
      </div>
      <details class="advanced-recipe" id="advancedRecipe"><summary><span><strong>Advanced: Creative Direction</strong><small>Edit the look or copy the reusable style</small></span><span class="advanced-caret" aria-hidden="true">+</span></summary>
        <div class="advanced-recipe-body"><p class="advanced-intro">Visual edits update both the full prompt and its reusable Style block. Copy style only leaves out Story and Format.</p>
          <p class="recipe-warning"><strong>Style trade-off:</strong> ${esc(cautionFor(s))}</p>
          <div class="recipe-form">${fields}${state.format!=='any'?`<label class="span2">Format consistency rule (full prompt only)<textarea data-recipe-field="consistency" rows="3" maxlength="800">${esc(r.consistency)}</textarea></label>`:''}</div>
          <div class="advanced-actions"><button type="button" class="btn btn-secondary" data-action="copy-style-only">Copy style only</button>${ENABLE_RECIPE_DOWNLOAD?'<button type="button" class="btn btn-outline" data-action="export">Download Style Recipe (.json) &#8595;</button>':''}</div>
          ${ENABLE_RECIPE_DOWNLOAD?'<p class="advanced-intro advanced-footnote">Style Recipe (.json) contains the full prompt, reusable style, choices and editable visual fields.</p>':''}
        </div>
      </details>
    </section>`;
  }
  function renderResults(){
    if(state.selected&&state.detailsOpen)return `<section class="stage-surface results has-selection" aria-labelledby="selectedTitle"><div class="results-main">${recipeMarkup()}</div></section>`;
    const picks=topStyles(),hasGenre=!!state.genre;
    const heading='h1';
    const catalog=state.tab==='all'?`<section id="catalog" aria-labelledby="catalog-head"><div class="catalog-heading"><h2 id="catalog-head" tabindex="-1">All 96 styles</h2><button type="button" class="btn-text" data-tab="recommended">Back to suggestions</button></div><div class="catalog-tools"><input id="catalogSearch" aria-label="Search comic styles" placeholder="Search style or keyword…" value="${esc(state.query)}"><select id="familySelect" aria-label="Filter styles by family"><option value="all">All visual families</option>${Object.keys(FAMILIES).map(f=>`<option value="${esc(f)}" ${state.family===f?'selected':''}>${esc(f)}</option>`).join('')}</select></div><div id="catalogContents">${catalogMarkup()}</div></section>`:`<div class="catalog-entry" id="catalog"><button type="button" class="btn btn-outline" data-tab="all">Browse all 96 styles</button></div>`;
    const discovery=`<section class="discovery" aria-labelledby="recommendationsTitle"><header class="results-heading"><${heading} id="recommendationsTitle" tabindex="-1">${hasGenre?(picks.length===6?'Six styles for your story':'Styles for your story'):(picks.length===6?'Six styles to start with':'Styles to start with')}</${heading}><p>Open a style to see its sample and copy the style instructions.</p></header>
      <div class="results-summary"><p>${[typeLabel(),feelLabel(),formatLabel(),...(state.approach==='any'?[]:[APPROACHES[state.approach].label])].map(x=>`<span>${esc(x)}</span>`).join('<span aria-hidden="true"> · </span>')}</p><button type="button" class="btn-text" data-step="1">${hasGenre?'Edit choices':'Try the three questions'}</button></div>
      ${resultsFiltersMarkup()}
      <div class="recommend-grid">${picks.length?picks.map(x=>card(x.s)).join(''):'<div class="empty-state"><h2>No styles match these filters.</h2><p>Try a different combination or clear the filters.</p><button type="button" class="btn btn-secondary" data-action="clear-filters">Clear filters</button></div>'}</div>
      <details class="collection-note"><summary>About these styles and previews</summary><p>The 96 entries mix drawing techniques, visual traditions, genres and comic formats. You can combine them, such as a watercolor look with vertical webcomic pacing. Previews are AI-generated illustrations with recurring invented characters, not definitive historical examples or controlled comparisons. The artwork was generated in advance; this finder does not generate images. Matches use curated offline rules, not probabilities.</p></details>
      ${catalog}</section>`;
    return `<section class="stage-surface results" aria-labelledby="recommendationsTitle"><div class="results-main">${discovery}</div></section>`;
  }

  function catalogMarkup(){
    if(state.tab!=='all')return '';
    const q=state.query.trim().toLowerCase(),idQuery=/^#?\d+$/.test(q)?Number(q.replace('#','')):null;
    const matching=STYLES.filter(matchesRefinements).filter(s=>{const words=[s.id,'#'+s.id,s.name,s.signature,s.family,...s.genres.map(k=>GENRES[k].label)].join(' ').toLowerCase();return (idQuery!==null?s.id===idQuery:(!q||words.includes(q)))&&(state.family==='all'||s.family===state.family);});
    return `<p class="catalog-meta">${matching.length} of 96 styles</p>${matching.length?`<div class="catalog-grid">${matching.slice(0,catalogLimit).map(s=>card(s)).join('')}</div>${matching.length>catalogLimit?`<div class="load-row"><button type="button" class="btn btn-secondary" data-action="load-more">Show ${Math.min(24,matching.length-catalogLimit)} more styles ↓</button></div>`:''}`:`<div class="empty-state"><h3>No styles found.</h3><p>Try a broader keyword, change the family or style filters, or clear the filters.</p><button type="button" class="btn btn-secondary" data-action="clear-filters">Clear filters</button></div>`}`;
  }
  // Replacing a control must not send keyboard users back to the page start.
  function focusedControlSelector(){
    const el=document.activeElement;if(!el)return null;
    if(el.id)return `#${CSS.escape(el.id)}`;
    for(const key of ['genre','mood','format','approach','action','step','tab']){
      if(el.dataset?.[key])return `[data-${key}="${CSS.escape(el.dataset[key])}"]${el.dataset.id?`[data-id="${CSS.escape(el.dataset.id)}"]`:''}`;
    }
    return null;
  }
  function restoreControlFocus(selector,root=document){const el=selector?Array.from(root.querySelectorAll(selector)).find(el=>el.getClientRects().length):null;el?.focus({preventScroll:true});return !!el;}
  function renderStage(){const focused=focusedControlSelector();progress();$('stageView').innerHTML=state.step===1?renderGenre():state.step===2?renderFeeling():state.step===3?renderFormat():renderResults();restoreControlFocus(focused);}
  function rerenderPreservingScroll(){const y=window.scrollY,open=$('advancedRecipe')?.open;renderStage();if(open&&$('advancedRecipe'))$('advancedRecipe').open=true;window.scrollTo({top:y,behavior:'instant'});}
  function setStep(n){if(n>1&&!state.genre&&n!==4){toast('Choose a story type first.');return;}state.step=n;if(n===4)state.detailsOpen=false;save();renderStage();$('wizard').scrollIntoView({block:'start',behavior:scrollBehavior()});$(n===4?'recommendationsTitle':'wizardTitle')?.focus({preventScroll:true});}
  function chooseStyle(id){if(!BY_ID.has(id))return;if(state.selected!==id){state.recipeEdits={};state.selected=id;}state.step=4;state.detailsOpen=true;save();renderStage();requestAnimationFrame(()=>{const target=$('selectionZone');if(target){target.scrollIntoView({behavior:scrollBehavior(),block:'start'});$('selectedTitle')?.focus({preventScroll:true});}});toast(`${BY_ID.get(id).name} selected. Your Style Prompt is ready to copy.`);}
  function buildRecipeExport(){const s=BY_ID.get(state.selected),r=selectedRecipe();return {version:2,application:'Comic Style Finder · Comic Story Studio',createdAt:new Date().toISOString(),guidedChoices:{storyType:state.genre,storyTypeLabel:typeLabel(),readerFeeling:state.mood,format:state.format,carouselChannel:state.carouselChannel,approach:state.approach,finish:state.finish,colorPreference:state.color,audience:state.audience},selectedStyle:{id:s.id,name:s.name,family:s.family,signature:s.signature,previewStatus:'ai-generated-art-illustrative-study'},styleRecipe:r,stylePrompt:stylePrompt(s),styleOnlyPrompt:styleOnlyPrompt(s),creativeDirectionPrompt:panelPrompt(s),comparisonShortlist:[],disclaimer:'Visual inspiration only. Illustrations are AI-generated interpretations featuring newly invented characters. Do not copy protected characters or imitate particular living artists. Review all site assets and representations before public release.'};}
  function downloadRecipe(){if(!state.selected)return;const json=JSON.stringify(buildRecipeExport(),null,2);const a=document.createElement('a');const blob=new Blob([json],{type:'application/json;charset=utf-8'});const u=URL.createObjectURL(blob);a.download=`comic-style-recipe-${slug(BY_ID.get(state.selected).name)}.json`;a.href=u;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),3500);toast('Style Recipe (.json) download started.');}
  async function copyText(s){try{await navigator.clipboard.writeText(s);return true;}catch{}
    const active=document.activeElement,ta=document.createElement('textarea');ta.value=s;ta.readOnly=true;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy');}catch{}finally{ta.remove();active?.focus({preventScroll:true});}return ok;
  }
  function resetState(){const fresh=initialState();Object.keys(fresh).forEach(k=>state[k]=fresh[k]);catalogLimit=24;save();renderStage();$('wizard').scrollIntoView({block:'start',behavior:scrollBehavior()});toast('Finder reset. Choices and edits cleared.');}
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    const action=b.dataset.action,id=Number(b.dataset.id);
    if(b.hasAttribute('data-step')){setStep(Number(b.dataset.step));return;}
    if(b.dataset.genre){state.genre=b.dataset.genre;save();renderStage();return;}
    if(b.dataset.mood){state.mood=b.dataset.mood;save();renderStage();return;}
    if(b.dataset.approach){state.approach=state.approach===b.dataset.approach?'any':b.dataset.approach;save();renderStage();return;}
    if(b.dataset.format){state.format=b.dataset.format;save();renderStage();return;}
    if(b.dataset.tab){state.tab=b.dataset.tab;save();rerenderPreservingScroll();requestAnimationFrame(()=>{const target=$(state.tab==='all'?'catalog-head':'recommendationsTitle');target?.scrollIntoView({behavior:scrollBehavior(),block:'start'});if(state.tab==='all')$('catalogSearch')?.focus({preventScroll:true});else target?.focus({preventScroll:true});});return;}
    switch(action){
      case 'next':if(!state.genre){toast('Please choose a story type first.');break;}setStep(Math.min(4,state.step+1));break;
      case 'previous':setStep(Math.max(1,state.step-1));break;
      case 'browse':state.step=4;state.tab='all';state.detailsOpen=false;save();renderStage();requestAnimationFrame(()=>{$('catalog-head')?.scrollIntoView({block:'start',behavior:'instant'});$('catalogSearch')?.focus({preventScroll:true});});break;
      case 'restart':resetState();break;
      case 'load-more':catalogLimit+=24;save();rerenderPreservingScroll();break;
      case 'clear-filters':state.query='';state.family='all';state.finish='any';state.color='any';state.audience='everyone';catalogLimit=24;save();rerenderPreservingScroll();$('finishSelect')?.focus();break;
      case 'detail':chooseStyle(id);break;
      case 'clear-selection':state.detailsOpen=false;save();renderStage();$('recommendationsTitle')?.scrollIntoView({block:'start',behavior:scrollBehavior()});$('recommendationsTitle')?.focus({preventScroll:true});break;
      case 'export':if(ENABLE_RECIPE_DOWNLOAD)downloadRecipe();break;
      case 'copy-style':if(state.selected)copyText(stylePrompt(BY_ID.get(state.selected))).then(ok=>toast(ok?'Style Prompt copied.':'Couldn’t copy. Select the Style Prompt text and copy it manually.'));break;
      case 'copy-style-only':if(state.selected)copyText(styleOnlyPrompt(BY_ID.get(state.selected))).then(ok=>toast(ok?'Style block copied.':'Couldn’t copy. Select the Style section above and copy it manually.'));break;
    }
  });
  document.addEventListener('input',e=>{
    if(e.target.id==='catalogSearch'){
      state.query=e.target.value.slice(0,90);catalogLimit=24;save();
      // Repaint results, not the field, to preserve cursor focus and position.
      const node=$('catalogContents');if(node)node.innerHTML=catalogMarkup();
    }
    if(e.target.dataset.recipeField){
      if(!state.selected)return;
      const key=e.target.dataset.recipeField;if(!Object.hasOwn(RECIPE_LIMITS,key))return;
      state.recipeEdits[key]=e.target.value.slice(0,RECIPE_LIMITS[key]);
      save();
      const prompt=$('stylePromptText');
      if(prompt)prompt.textContent=stylePrompt(BY_ID.get(state.selected));
    }
  });
  document.addEventListener('change',e=>{
    if(e.target.name==='carouselChannel'&&Object.hasOwn(CAROUSEL_CHANNELS,e.target.value)){state.carouselChannel=e.target.value;save();return;}
    const k={finishSelect:'finish',colorSelect:'color',audienceSelect:'audience',familySelect:'family'}[e.target.id];
    if(k){state[k]=e.target.value;if(k==='family')catalogLimit=24;save();if(k==='family'){$('catalogContents').innerHTML=catalogMarkup();}else{rerenderPreservingScroll();}}
  });
  save();
  renderStage();
})();

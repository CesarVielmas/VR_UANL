export default {
  data() {
    return {
      isClient: false,
      isMobileOrVR: false,
      currentArea: 'hallwayA', // Área inicial
      currentPanel: null, // Panel inicial
      panelPosition: { x: 0, y: 0, z: -2 }, // Posición inicial del panel
      fuseActive: false, // Estado fuse
      inspectorMode: false, // Modo inspector
      infoData: {
        area: {
          hallwayA: { image: 'hallway.jpg', areRot: '0 0 0' },
          office: { image: 'office.jpg', areRot: '0 90 0' },
        },
      },
      areaButtons: [
        { id: 'hallwayA', text: 'Hallway', position: '-0.5 1.6 3' },
        { id: 'office', text: 'Office', position: '0.5 1.6 -2' },
      ],
      infoButtons: [
        { id: 'punto1', text: 'Info Punto 1', position: '-2 1.0 0' },
        { id: 'pinturaA', text: 'Pintura A', position: '2 2.0 0.2' },
      ],
    };
  },
  mounted() {
    this.isClient = true;

    // Comprobar si es un dispositivo VR/AR
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    this.isMobileOrVR = /Oculus/i.test(userAgent);

    // Aquí puedes agregar los componentes de A-Frame y otras inicializaciones que sean necesarias
  },
  methods: {
    setCurrentArea(area) {
      this.currentArea = area;
      this.currentPanel = null;
    },
    setCurrentPanel(panel) {
      this.currentPanel = panel;
      this.panelPosition = { x: 0, y: 0, z: -2 };
    },
  },
};
